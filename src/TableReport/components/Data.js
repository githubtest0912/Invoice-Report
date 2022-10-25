import React from "react";
import Modal from './Modal'
const Data = ({ InvoiceData, sorting, show, selectedData, hideModal,handleClick }) => {
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
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {InvoiceData.length > 0 &&
            InvoiceData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.InvoiceID}</td>
                  <td>{item.InvoiceAmount}</td>
                  <td>{item.BillingPeriod}</td>
                  <td>{item.CreditsUsed} </td>
                  <td>{item.CreditsLimit}</td>
                  <td>{item.InvoicePaymentStatus}</td>
                  <td>
                <button className='detailButton' onClick={() => handleClick(item)}>
                 View
                </button>
              </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {show && <Modal details={selectedData} handleClose={hideModal} />}
      {InvoiceData.length === 0 && <span>No records found to display</span>}
    </div>
  );
};

export default Data;
