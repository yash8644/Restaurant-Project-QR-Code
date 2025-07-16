import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function Invoice() {
  const { Order_no } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    console.log("Order_no from URL:", Order_no);
    Axios.get(`http://localhost:1337/api/invoice/${Order_no}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [Order_no]);

  const totalAmount = orderDetails.reduce((acc, item) => acc + (item.Price * item.quantity), 0);
  const gstAmount = totalAmount * 0.18;
  const grandTotal = totalAmount + gstAmount;

  // Download PDF Function
  const handleDownload = () => {
    const element = document.getElementById('invoiceholder');
    const opt = {
      margin: 0.5,
      filename: `Invoice_${orderDetails[0]?.Order_no || 'N/A'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div id="invoiceholder">
        <div id="headerimage"></div>
        <div id="invoice" className="effect2">
          <div id="invoice-top">
            <div className="logo"></div>
            <div className="info">
              <h2>Royal Bites</h2>
              <p>Royalbites@com <br /> 289-335-6503</p>
            </div>
            <div className="title">
              <h1>Invoice #{orderDetails[0]?.Order_no || 'N/A'}</h1>
            </div>
          </div>

          <div id="invoice-bot">
            <div id="table">
              <table>
                <thead>
                  <tr className="tabletitle">
                    <td className="item"><h2>Food Name</h2></td>
                    <td className="Hours"><h2>Quantity</h2></td>
                    <td className="Rate"><h2>Price</h2></td>
                    <td className="subtotal"><h2>Sub-total</h2></td>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((item, idx) => (
                    <tr className="service" key={idx}>
                      <td className="tableitem"><p className="itemtext">{item.Product_Name}</p></td>
                      <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
                      <td className="tableitem"><p className="itemtext">₹{item.Price.toFixed(2)}</p></td>
                      <td className="tableitem"><p className="itemtext">₹{(item.Price * item.quantity).toFixed(2)}</p></td>
                    </tr>
                  ))}
                  <tr className="tabletitle">
                    <td></td>
                    <td></td>
                    <td className="Rate"><h2>Total</h2></td>
                    <td className="payment"><h2>₹{grandTotal.toFixed(2)}</h2></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="legalcopy">
              <p className="legal"><strong>Thank you for your Order!</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div className="yash123">

            <button onClick={handleDownload} style={{ textAlign:'center', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
  Download PDF
</button>
</div>
    </div>
    
  );
}

export default Invoice;
