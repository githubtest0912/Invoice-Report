import React, { useState, useEffect } from "react";
import Data from "./components/Data";
import axios from "axios";
import "./style/styles.css";

const MainTable = () => {
  const [fetchData, updateFetchData] = useState([]);
  // modal
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
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

  let API_URL = `http://localhost:3003/data`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        updateFetchData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_URL]);

  return (
    <div>
      <Data
        fetchData={fetchData}
        show={show}
        selectedData={selectedData}
        handleClick={handleClick}
        hideModal={hideModal}
        sorting={sorting}
      />
    </div>
  );
};

export default MainTable;
