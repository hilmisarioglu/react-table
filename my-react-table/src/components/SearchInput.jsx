import React from "react";

function SearchInput(props) {
  const { label, placeholder, value, onChange } = props;
  return (
    <input
      type={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchInput;
