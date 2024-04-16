import React from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  const { itemsPerPage, setItemsPerPage, pageOptions } = props;
  return (
    <select
      value={itemsPerPage}
      onChange={(e) => setItemsPerPage(Number(e.target.value))}
    >
      {pageOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
Dropdown.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    setItemsPerPage: PropTypes.func.isRequired,
    pageOptions: PropTypes.arrayOf(PropTypes.number)
  };
export default Dropdown;
