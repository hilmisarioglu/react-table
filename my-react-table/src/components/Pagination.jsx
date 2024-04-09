import React from "react";

function Pagination(props) {
  const { sortedData, pageSize, currentPage, setCurrentPage } = props;

  return (
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
  );
}

export default Pagination;
