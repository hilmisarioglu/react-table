import React from "react";

function THead(props) {
  const { visibleColumns, sortConfig, setSortConfig } = props;
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
  return (
    <thead>
      <tr>
        {visibleColumns.map((column, i) => (
          <th key={i} onClick={() => requestSort(column)}>
            {column}
            {sortConfig &&
              sortConfig.key === column &&
              (sortConfig.direction === "ascending" ? " 🔼" : " 🔽")}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default THead;
