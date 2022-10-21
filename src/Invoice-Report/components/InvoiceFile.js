import React, {useState, useEffect} from 'react'
import '../../App.css'
import axios from "axios";

const InvoiceFile = () => {
    const [data, setData] = useState([]);

// sort
const [order, setOrder] = useState("ASC");

const sorting = (col) => {
  if (order === "ASC") {
    const sorted = [...data];
    //console.log("Asc  : ", sorted);
    sorted.sort((a, b) =>
      typeof a[col] === "number"
        ? a[col] - b[col]
        : a[col].toLowerCase() > b[col].toLowerCase()
        ? 1
        : -1
    );
    setData(sorted);
    setOrder("DSC");
  }

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

      const renderData = () => {
        return data && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <tr key={item.index}>
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
          <h1>No Data Available</h1>
        );
      };

  return (
    <div>
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
  )
}

export default InvoiceFile