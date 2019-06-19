/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import sortTypes from '../../constants/sortTypes';
import stringFormatter from '../../helpers/stringFormatter';

const arrows = {
  asc: '\u02c5',
  desc: '\u02c4'
};

function СustomTable(props) {
  const { headers, items, onClick } = props;
  const [sortedItems, setSortedItems] = useState([...items]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortType, setSortType] = useState(0);

  const handleSort = ({ target }) => {
    const columnName = target.getAttribute('name');
    const columnType = target.getAttribute('type');

    const header = target.innerText.replace(/˅|˄| /g, '');

    if (sortColumn === columnName && sortType === sortTypes[columnType].length) {
      setSortType(0);
      target.innerText = header;
      setSortedItems([...items]);
      return;
    } else if (sortColumn !== columnName) {
      setSortType(0);
      target.innerText = `${header} ${arrows.asc}`;
    } else {
      setSortType(sortType + 1);
      target.innerText = `${header} ${arrows.desc}`;
    }

    setSortColumn(columnName);

    const sortAlg = sortTypes[columnType][sortType];

    const sorted = sortAlg(sortedItems, columnName);

    setSortedItems(sorted);
  };

  return (
    <Table bordered hover responsive>
      <thead>
        <tr onClick={handleSort}>
          {headers.map(header => (
            <th key={header} name={header} type={typeof sortedItems[0][header]}>
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
