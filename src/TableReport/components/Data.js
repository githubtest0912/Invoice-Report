import React from "react";

const Data = ({ fetchData }) => {
  const renderData = () => {
    return (
      fetchData.length > 0 &&
      fetchData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.InvoiceID}</td>
            <td>{item.InvoiceAmount}</td>
            <td>{item.BillingPeriod}</td>
            <td>{item.CreditsUsed} </td>
            <td>{item.CreditsLimit}</td>
            <td>{item.InvoicePaymentStatus}</td>
            <td>
              <button className="detailButton">View</button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <span>Invoice ID</span>
            </th>
            <th>
              <span>Invoice Amount</span>
            </th>
            <th>
              <span>Billing Period</span>
            </th>
            <th>
              <span>Credits Used</span>
            </th>
            <th>
              <span>Credit Limit</span>
            </th>
            <th>
              <span>Invoice Payment Status</span>
            </th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>

      {fetchData.length === 0 && <span>No records found to display</span>}
    </div>
  );
};

export default Data;
