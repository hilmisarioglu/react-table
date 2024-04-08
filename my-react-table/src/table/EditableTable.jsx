import React, { useState, useEffect, useMemo } from "react";
import "./EditableTable.css";

function EditableTable({
  initialColumns = ["firstName", "lastName", "age"],
  initialData,
}) {
  const [data, setData] = useState(initialData);
  const [filterText, setFilterText] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(initialColumns);
  const [isActive, setIsActive] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      visibleColumns.some((column) =>
        row[column].toString().toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText, visibleColumns]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((current) =>
      current.includes(column)
        ? current.filter((c) => c !== column)
        : [...current, column]
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div
          className={
            isActive ? "checkbox-dropdown is-active" : "checkbox-dropdown"
          }
          onClick={() => setIsActive(!isActive)}
        >
          Select Column 
          <ul className="checkbox-dropdown-list">
            {initialColumns.map((column) => (
              <li>
                <label key={column}>
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(column)}
                    onChange={() => toggleColumnVisibility(column)}
                  />
                  {column}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <table className="editable-table">
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th key={column} onClick={() => requestSort(column)}>
                {column}
                {sortConfig &&
                  sortConfig.key === column &&
                  (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {visibleColumns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(
          { length: Math.ceil(sortedData.length / pageSize) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EditableTable;
