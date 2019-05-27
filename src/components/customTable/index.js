import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function СustomTable(props) {
  const { headers, items, onClick } = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
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
