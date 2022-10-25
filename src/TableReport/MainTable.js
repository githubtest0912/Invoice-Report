import React, { useState, useEffect } from "react";
import Data from "./components/Data";
import axios from "axios";
import "./style/styles.css";

const MainTable = () => {
  const [fetchData, updateFetchData] = useState([]);
  // modal
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  //modal
  const handleClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
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
      />
    </div>
  );
};

export default MainTable;
