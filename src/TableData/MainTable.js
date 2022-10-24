import React, { useState, useEffect } from "react";
import Data from './components/Data'
import Pagination from './components/Pagination'
import Search from "./components/Search";
import './style/style.css'

const MainTable = () => {
  const [fetchData, updateFetchData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // modal
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  //search
  const [searchText, setSearchText] = useState("");
  // sort
  const [order, setOrder] = useState("ASC");

  //modal
  const handleClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  // search
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };
  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (!lowerCaseValue) {
      updateFetchData(fetchData);
    } else {
      const filteredData = fetchData.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key].toString().toLowerCase().includes(lowerCaseValue);
        });
      });
      updateFetchData(filteredData);
    }
  };
  

  //sort
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...fetchData];
      //console.log("Asc  : ", sorted);
      sorted.sort((a, b) =>
        typeof a[col] === "number"
          ? a[col] - b[col]
          : a[col].toLowerCase() > b[col].toLowerCase()
          ? 1
          : -1
      );
      updateFetchData(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...fetchData];
      sorted.sort((a, b) =>
        typeof a[col] === "number"
          ? b[col] - a[col]
          : b[col].toLowerCase() > a[col].toLowerCase()
          ? 1
          : -1
      );
      updateFetchData(sorted);
      setOrder("ASC");
    }
  };

  //======================================================

  let API_URL = `http://localhost:3003/data`;

  useEffect(() => {
    (async function () {
      let data = await fetch(API_URL).then((res) => res.json());
      updateFetchData(data);
    })();
  }, [API_URL]);

  //pagination
  //   lastPostIndex(20) = currentPage(2) * postsPerPage(10)
  const lastPostIndex = currentPage * postsPerPage;
  // Ex: 10 = 20 - 10
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = fetchData.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        handleChange={handleChange}
      
      />
      <Data
        fetchData={currentPosts}
        selectedData={selectedData}
        show={show}
        hideModal={hideModal}
        handleClick={handleClick}
        sorting={sorting}
      />
      <Pagination
        totalPosts={fetchData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
     
     
    </div>
  );
};

export default MainTable;
