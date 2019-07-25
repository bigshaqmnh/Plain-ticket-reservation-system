import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './style.scss';

import sortAlgorithms from '../../constants/sortAlgorithms';
import formatFromCamelCase from '../../helpers/formatters/formatString';
import formatDate from '../../helpers/formatters/formatDate';

function СustomTable(props) {
  const { headers, items, linkPath, onClick } = props;

  const [sortedItems, setSortedItems] = useState([...items]);
  const [sortOption, setSortOption] = useState({});

  const handleSort = ({ target }) => {
    const column = target.getAttribute('name');
    const { column: prevColumn, alg: prevAlg } = sortOption;
    let alg = '';
    let sortedItems = [...items];

    if (column !== prevColumn) {
      alg = 'asc';
    } else if (prevAlg !== 'desc') {
      alg = prevAlg ? 'desc' : 'asc';
    }

    if (alg) {
      const sortAlg = sortAlgorithms[alg];

      sortedItems = sortAlg(sortedItems, column);
    }

    setSortedItems(sortedItems);
    setSortOption({ column, alg });
  };

  useEffect(() => {
    setSortedItems([...items]);
  }, [items]);

  return (
    <Table bordered hover responsive>
      <thead>
        <tr onClick={handleSort}>
          {headers.map(header => (
            <th key={header} name={header} className={sortOption.column === header ? sortOption.alg : ''}>
              {formatFromCamelCase(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => (
          <LinkContainer to={`${linkPath}/${item.id}/details`}>
            <tr key={item.id} id={item.id} onClick={onClick}>
              {Object.keys(item).map(key => {
                let value = item[key];

                if (value instanceof Date) {
                  value = formatDate(value);
                } else if (typeof value === 'boolean') {
                  value = value ? '\u2714' : '\u274c';
                }

                return <td key={key}>{value}</td>;
              })}
            </tr>
          </LinkContainer>
        ))}
      </tbody>
    </Table>
  );
}

СustomTable.propTypes = {
  headers: PropTypes.instanceOf(Array).isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  linkPath: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

СustomTable.defaultProps = {
  onClick: null
};

export default СustomTable;
