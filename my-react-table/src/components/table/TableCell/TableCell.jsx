import React from 'react';
import PropTypes from 'prop-types';
import './TableCell.css'; 

const TableCell = ({ children, width }) => {
  return (
    <td style={{ width }} className="table-cell">
      {children}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.node, 
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TableCell;
