import React from "react";
import PropTypes from "prop-types";
import TableCell from "../TableCell/TableCell";

function capitalize(str = "") {
  const firstChar = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return firstChar + rest;
}

function TableRow(props) {
  const {
    rowData,
    columns,
    onRowClick,
    onDeleteData,
    handleEditCellClick,
    settings,
    isSelected,
    onRowSelect,
  } = props;
  const handleClick = (event) => {
    if (onRowClick) {
      onRowClick(rowData.id, event);
    }
  };
  return (
    <tr
      className={`table-row ${isSelected ? "selected-row" : ""}`}
      onClick={handleClick}
    >
      <td className="table-row-td">
        <div className="table-row-container">
          <div>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onRowSelect(rowData.id)}
            />
          </div>
        </div>
      </td>
      {columns.map((column) => (
        <TableCell
          key={column.key}
          width={column.width}
          content={capitalize(rowData[column.key])}
          onDeleteData={onDeleteData}
          onEditCell={handleEditCellClick}
          rowId={rowData.id}
          columnKey={column.key}
          isEditable={settings.editableColumns.includes(column.key)}
        />
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
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onDeleteData: PropTypes.func,
  handleEditCellClick: PropTypes.func,
  onRowClick: PropTypes.func,
  settings: PropTypes.object,
};

export default TableRow;
