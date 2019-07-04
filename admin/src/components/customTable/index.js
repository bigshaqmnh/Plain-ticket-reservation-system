import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import './style.scss';

import sortAlgorithms from '../../constants/sortAlgorithms';
import stringFormatter from '../../helpers/stringFormatter';

function СustomTable(props) {
  const { headers, items, onClick } = props;

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
              {stringFormatter.toRegular(header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => (
          <tr key={item.id} id={item.id} onClick={onClick}>
            {Object.keys(item).map(key => (
              <td key={key}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

СustomTable.propTypes = {
  headers: PropTypes.instanceOf(Array).isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onClick: PropTypes.func
};

СustomTable.defaultProps = {
  onClick: null
};

export default СustomTable;
