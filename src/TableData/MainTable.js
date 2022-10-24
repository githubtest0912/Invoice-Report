import React, { useState, useEffect } from "react";
import Data from './components/Data'
import Pagination from './components/Pagination'
import './style/style.css'

const MainTable = () => {
  const [fetchData, updateFetchData] = useState([]);

// pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // modal
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
 
  const handleClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  
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
      <Data
        fetchData={currentPosts}
        selectedData={selectedData}
        show={show}
        hideModal={hideModal}
        handleClick={handleClick}
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
