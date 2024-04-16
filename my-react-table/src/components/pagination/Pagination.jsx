import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const renderPageNumbers = pageNumbers.map(number => {
    if (number === 1 || number === totalPages || (number >= currentPage - 2 && number <= currentPage + 2)) {
      return (
        <button
          key={number}
          className={`page-button ${currentPage === number ? "active" : ""}`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      );
    } else if ((number === currentPage - 3) || (number === currentPage + 3)) {
      return <span key={number} className="dots">...</span>;
    }
    return null;
  });

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers}
      <button
        className="page-button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
