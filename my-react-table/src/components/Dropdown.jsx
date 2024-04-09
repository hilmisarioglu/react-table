import React from "react";

function Dropdown(props) {
  const { value, onChange, mappedArray } = props;
  return (
    <select value={value} onChange={onChange}>
      {mappedArray.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
