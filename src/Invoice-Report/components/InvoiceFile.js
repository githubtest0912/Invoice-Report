import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";

const InvoiceFile = () => {
  const [data, setData] = useState([]);
  // search
  const [value, setValue] = useState("");

  // sort
  const [order, setOrder] = useState("ASC");

  const sorting = (col) => {
    // Ascending order
    if (order === "ASC") {
      const sorted = [...data];
      //console.log("Asc  : ", sorted);
      sorted.sort((a, b) =>
        // check whether data is a number or string

        typeof a[col] === "number"
          ? a[col] - b[col]
          : a[col].toLowerCase() > b[col].toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("DSC");
    }

    // descending order

    if (order === "DSC") {
      const sorted = [...data];
      sorted.sort((a, b) =>
        typeof a[col] === "number"
          ? b[col] - a[col]
          : b[col].toLowerCase() > a[col].toLowerCase()
          ? 1
          : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  // call api
  const getData = async () => {
    await axios
      .get("http://localhost:3003/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // get the data from json file

  const renderData = () => {
    return data && data.length > 0 ? (
      data.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.InvoiceID}</td>
            <td>{item.InvoiceAmount}</td>
            <td>{item.BillingPeriod}</td>
            <td>{item.CreditsUsed} </td>
            <td>{item.CreditsLimit}</td>
            <td>{item.InvoicePaymentStatus}</td>
          </tr>
        );
      })
    ) : (
      <h3>Loading...</h3>
    );
  };

  // handle search

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:3003/data?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // reset button
  const handleReset = () => {
    getData();
  };

  // create clickable header

  return (
    <div>
      {/* // search button */}
      <form
        className="example"
        onSubmit={handleSearch}
        style={{ margin: "auto", maxWidth: "300px" }}
      >
        <input
          type="text"
          placeholder="Search.."
          name="search2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <button type="submit" className="greenbutton" onClick={handleReset}>
        Reset
      </button>

      <table>
        <thead>
          <tr>
            <th onClick={() => sorting("InvoiceID")}>
              <span>Invoice ID</span>
            </th>
            <th onClick={() => sorting("InvoiceAmount")}>
              <span>Invoice Amount</span>
            </th>
            <th onClick={() => sorting("BillingPeriod")}>
              <span>Billing Period</span>
            </th>
            <th onClick={() => sorting("CreditsUsed")}>
              <span>Credits Used</span>
            </th>
            <th onClick={() => sorting("CreditsLimit")}>
              <span>Credit Limit</span>
            </th>
            <th onClick={() => sorting("InvoicePaymentStatus")}>
              <span>Invoice Payment Status</span>
            </th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
    </div>
  );
};

export default InvoiceFile;
