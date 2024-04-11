import React from "react";
import PropTypes from "prop-types";
import "./THead.css";

function THead(props) {
  const {
    columns,
    visibleColumns,
    columnWidths,
    onHeaderClick,
    sortConfig,
  } = props;

  return (
    <thead>
      <tr>
        {visibleColumns.map((key) => {
          const column = columns.find((c) => c.id === key);
          const style = { width: columnWidths[key] || column.width };
          const label = column?.label || "";
          const isSorted = sortConfig?.key === key;

          return (
            <th
              key={key}
              data-column-id={key}
              style={style}
              onClick={() => {
                if (column.sortable) {
                  onHeaderClick(key);
                }
              }}
            >
              <div className="table-column-header">
                <div
                  className={`header-content ${
                    !label ? "table-empty-header" : ""
                  }`}
                >
                  {label}
                  {isSorted && sortConfig.direction && (
                    <span className="sort-icon">
                      {sortConfig?.direction === "ascending" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

THead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnWidths: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onHeaderClick: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["ascending", "descending", ""]),
  }).isRequired,
};

export default THead;
