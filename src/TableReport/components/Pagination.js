import React from "react";

const Pagination = ({ pageNumbers, paginate, currentPage }) => {
  return (
    <div className="pagination">
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
