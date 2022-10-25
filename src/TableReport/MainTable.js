import React, { useState, useEffect } from "react";
import Data from './components/Data'
import axios from "axios";
import './style/styles.css'

const MainTable = () => {
  const [fetchData, updateFetchData] = useState([]);

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
      <Data fetchData={fetchData} />
    </div>
  );
};

export default MainTable;
