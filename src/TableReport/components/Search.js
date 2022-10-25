import React from "react";

const Search = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
  return (
    <div>
      <form className="example">
        <input
          type="text"
          id="search"
          placeholder="Search..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </form>
    </div>
  );
};

export default Search;
