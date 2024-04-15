import React from "react";
import PropTypes from "prop-types";
import "./TableCell.css";

const TableCell = (props) => {
  const { children, width, text } = props;
  return (
    <td style={{ width }} className="table-cell">
      {text}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string.isRequired,
};

export default TableCell;
