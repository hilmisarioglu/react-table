import React from "react";

function TBody(props) {
  const {
    paginatedData,
    visibleColumns,
    editStatus,
    editableColumns,
    handleEdit,
    setEditStatus,
    handleBlurOrEnter,
  } = props;
  return (
    <tbody>
      {paginatedData.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {visibleColumns.map((columnKey) => (
            <td
              key={columnKey}
              onClick={() =>
                editableColumns.includes(columnKey) &&
                handleEdit(rowIndex, columnKey, row[columnKey])
              }
            >
              {editStatus.rowKey === rowIndex &&
              editStatus.columnKey === columnKey ? (
                <input
                  type="text"
                  value={editStatus.value}
                  onChange={(e) =>
                    setEditStatus({ ...editStatus, value: e.target.value })
                  }
                  onBlur={(e) => handleBlurOrEnter(e, rowIndex, columnKey)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleBlurOrEnter(e, rowIndex, columnKey)
                  }
                  autoFocus
                />
              ) : (
                row[columnKey]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TBody;
