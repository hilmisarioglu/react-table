import React from "react";

function MultiSelectDropdown(props) {
  const {
    isActive,
    onClick,
    label,
    mappedArray,
    visibleColumns,
    setVisibleColumns,
  } = props;
  const toggleColumnVisibility = (column) => {
    setVisibleColumns((current) =>
      current.includes(column)
        ? current.filter((c) => c !== column)
        : [...current, column]
    );
  };
  return (
    <div
      className={isActive ? "checkbox-dropdown is-active" : "checkbox-dropdown"}
      onClick={onClick}
    >
      {label}
      <ul className="checkbox-dropdown-list">
        {mappedArray.map((column, i) => (
          <li key={i}>
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
  );
}

export default MultiSelectDropdown;
