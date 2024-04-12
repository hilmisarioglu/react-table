import React from "react";
import PropTypes from "prop-types";
import TableCell from '../TableCell/TableCell'; 
import { PencilIcon, TrashIcon } from "../../Icons/Icons";

function capitalize(str = "") {
  const firstChar = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return firstChar + rest;
}

function TableRow({ rowData, columns, onRowClick, onDeleteData, handleEditClick }) {
  const handleClick = (event) => {
    if (onRowClick) {
      onRowClick(rowData.id, event);
    }
  };

  return (
    <tr onClick={handleClick}>
      {columns.map((column) => (
        <TableCell key={column.key} width={column.width}>
          {column.key === 'actions' ? (
            <div className="actions">
              <button onClick={() => onDeleteData(rowData.id)} className="btn btn-delete">
                <TrashIcon />
              </button>
              <button onClick={() => handleEditClick(rowData.id)} className="btn btn-edit">
                <PencilIcon />
              </button>
            </div>
          ) : (
            column.key === 'status' ? capitalize(rowData[column.key]) : rowData[column.key]
          )}
        </TableCell>
      ))}
    </tr>
  );
}

TableRow.propTypes = {
  rowData: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired,
  onDeleteData: PropTypes.func,
  handleEditClick: PropTypes.func,
  onRowClick: PropTypes.func,
};

export default TableRow;
