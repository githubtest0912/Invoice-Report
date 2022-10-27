import { useState, useEffect, useMemo } from "react";
import Data from "./components/Data";
import axios from "axios";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import "./style/styles.css";

export default function App() {
  const [fetchData, updateFetchData] = useState([]);

  // search
  const [searchTerm, setSearchTerm] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const DatasPerPage = 5;

  // sort
  const [order, setOrder] = useState("ASC");
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

  useEffect(() => {
    axios
      .get(`https://githubtest0912.github.io/Invoice-Report/data.json`)
      .then((response) => {
        updateFetchData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages / DatasPerPage); i++) {
    pageNumbers.push(i);
  }

  const InvoiceData = useMemo(() => {
    let searchData = fetchData;

    if (searchTerm) {
      searchData = searchData.filter(
        (item) =>
          item.InvoiceAmount.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.InvoiceID.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.InvoicePaymentStatus.toString()
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase()) ||
          item.CreditsUsed.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.CreditsLimit.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    setTotalPages(searchData.length);

    //Current Page slice
    return searchData.slice(
      (currentPage - 1) * DatasPerPage,
      (currentPage - 1) * DatasPerPage + DatasPerPage
    );
  }, [fetchData, currentPage, searchTerm]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // sort
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

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
      />
      <Data
        InvoiceData={InvoiceData}
        sorting={sorting}
        show={show}
        selectedData={selectedData}
        hideModal={hideModal}
        handleClick={handleClick}
      />

      <Pagination
        pageNumbers={pageNumbers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
