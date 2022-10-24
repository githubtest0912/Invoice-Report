import React from "react";
import Modal from './Modal'

const Data = ({ fetchData,handleClick,show,selectedData,hideModal }) => {
 
  const renderData = () => {
    return fetchData && fetchData.length > 0 ? (
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
                <button className='detailButton' onClick={() => handleClick(item)}>
               View
                </button>
              </td>
          </tr>
        );
      })
    ) : (
      <h3>Loading...</h3>
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
              <span> Payment Status</span>
            </th>
            <th><span>Show More</span></th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      {show && <Modal details={selectedData} handleClose={hideModal} />}
    </div>
  );
};
         



export default Data;
