import React from "react";
import PropTypes from "prop-types";
import "./TableHeaderCell.css";

const TableHeaderCell = (props) => {
  const { label, columnWidth, sortConfig, onHeaderCellClick,showSortArrowIcon } = props;

  const getSortIcon = () => {
    if (!sortConfig || !sortConfig.direction || !showSortArrowIcon)
      return null;
    return sortConfig.direction === "ascending" ? "▲" : "▼";
  };

  const sortIcon = getSortIcon();

  return (
    <th style={{ width: columnWidth }} onClick={onHeaderCellClick}>
      <div className="table-column-header">
        <div className={`header-content ${!label ? "table-empty-header" : ""}`}>
          {label}
          {sortIcon && <span className="sort-icon">{sortIcon}</span>}
        </div>
      </div>
    </th>
  );
};

TableHeaderCell.propTypes = {
  label: PropTypes.string.isRequired,
  columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onHeaderCellClick: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["ascending", "descending"]),
  }),
  showSortArrowIcon: PropTypes.bool,
};

export default TableHeaderCell;
