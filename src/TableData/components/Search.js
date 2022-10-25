import React from "react";


const Search = ({searchText,setSearchText,handleChange,handleReset}) => {
 
  
  return (
    <div>
        <form
        className="example" style={{ margin: "auto", maxWidth: "300px" }}>
      <input
        type="text"
        placeholder="Search.."
        name="search"
        autoComplete="off"
        value={searchText}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
      </form>
    
    </div>
  );
};

export default Search;
