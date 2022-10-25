import React from "react";

const Modal = ({ handleClose, details }) => {
  return (
    <div className="modal display-block">
      <section className="modal-main">
        <div className="App">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> ID</th>
                <th scope="col"> Amount</th>
                <th scope="col"> Period</th>
                <th scope="col">Credits Used</th>
                <th scope="col"> Limit</th>
                <th scope="col"> Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.InvoiceID}</td>
                <td>{details.InvoiceAmount}</td>
                <td>{details.BillingPeriod}</td>
                <td>{details.CreditsUsed}</td>
                <td>{details.CreditsLimit}</td>
                <td>{details.InvoicePaymentStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleClose} className="closeButton">
          close
        </button>
      </section>
    </div>
  );
};

export default Modal;
