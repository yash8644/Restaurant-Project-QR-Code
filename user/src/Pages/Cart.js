import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [table_no, setTableNumber] = useState(null);
  const [list, setlist] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTableNo = localStorage.getItem("tableNumber");
    if (storedTableNo) {
      setTableNumber(storedTableNo);
    } else {
      console.warn("No table number found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (table_no) {
      Axios.post("http://localhost:1337/api/showcart", { table_no })
        .then((response) => {
          setlist(response.data);
          calculateTotalPrice(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart data!", error);
        });
    }
  }, [table_no]);

  const calculateTotalPrice = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.Price * product.PQuantity;
    });
    setTotalPrice(total);
  };

  const increaseQuantity = (Menu_id, index) => {
    const updatedList = [...list];
    updatedList[index].PQuantity += 1;
    setlist(updatedList);

    Axios.post("http://localhost:1337/api/updateQuantity", {
      Menu_id,
      table_no,
      PQuantity: updatedList[index].PQuantity,
    })
      .then(() => {
        calculateTotalPrice(updatedList);
      })
      .catch((error) => {
        console.error("Error updating quantity!", error);
      });
  };

  const decreaseQuantity = (Menu_id, index) => {
    const updatedList = [...list];
    if (updatedList[index].PQuantity > 1) {
      updatedList[index].PQuantity -= 1;
      setlist(updatedList);

      Axios.post("http://localhost:1337/api/updateQuantity", {
        Menu_id,
        table_no,
        PQuantity: updatedList[index].PQuantity,
      })
        .then(() => {
          calculateTotalPrice(updatedList);
        })
        .catch((error) => {
          console.error("Error updating quantity!", error);
        });
    }
  };

  const handleDelete = (Cart_id) => {
    alert(Cart_id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:1337/api/Cart_Delete/${Cart_id}`)
          .then(() => {
            const updatedList = list.filter((val) => val.Cart_id !== Cart_id);
            setlist(updatedList);
            calculateTotalPrice(updatedList);

          })
          .catch((error) => {
            console.error("Error deleting item!", error);
          });
      }
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const Orderplace = async () => {
    const Total = totalPrice + totalPrice * 0.18;
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay script.");
      return;
    }

    const options = {
      key: "rzp_test_PvXHWTU8pwpyXP",
      amount: Math.round(Total * 100),
      currency: "INR",
      name: "Royal Bites",
      description: "Test transaction",
      handler: function () {
        const data = {
          table_no,
          Total,
        };

        Axios.post("http://localhost:1337/api/pay", data)
  .then((res) => {
          const { Order_no } = res.data;
          Swal.fire({
          title: "Payment Successful",
          text: "Your payment was processed successfully.",
          icon: "success",
          confirmButtonText: "OK",
          }).then(() => {
          navigate(`/invoice/${Order_no}`);
          });
          })

          .catch(() => {
            Swal.fire({
              title: "Partial Success",
              text: "Payment was successful, but order could not be processed.",
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      },
      prefill: {
        name: "Royal Bites",
        email: "Royalbites@gmail.com",
        contact: "9993875868",
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    razorpay.on("payment.failed", function (response) {
      alert("Payment failed");
      console.log(response.error);
    });
  };

  return (
    <section className="shopping-cart dark">
      <div className="container">
        <div className="block-heading">
          <h2>Shopping Cart</h2>
        </div>
        <div className="content">
          <div className="col" style={{ fontWeight: "600" }}>
            {table_no ? (
              <h5>Table Number: {table_no}</h5>
            ) : (
              <h5>Loading table number...</h5>
            )}
          </div>

          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  {list && list.length > 0 ? (
                    list.map((val, index) => (
                      <div className="row" key={val.Menu_id}>
                        <div className="col-md-3">
                          <img
                            src={`http://localhost:1337/${val.Image}`}
                            style={{ width: "182px", height: "114px" }}
                            alt={val.Product_Name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="info">
                            <div className="row">
                              <div className="col-md-5 product-name">
                                <div className="product-name">
                                  <a href="#">{val.Product_Name}</a>
                                </div>
                              </div>
                              <div className="col-md-4 quantity d-flex align-items-center">
                                <button
                                  onClick={() =>
                                    decreaseQuantity(val.Menu_id, index)
                                  }
                                  className="btn btn-outline-secondary btn-sm me-2"
                                >
                                  -
                                </button>
                                <span>{val.PQuantity}</span>
                                <button
                                  onClick={() =>
                                    increaseQuantity(val.Menu_id, index)
                                  }
                                  className="btn btn-outline-secondary btn-sm ms-2"
                                >
                                  +
                                </button>
                              </div>
                              <div className="col-md-3 d-flex justify-content-between align-items-center" >
                                <span>₹{val.Price * val.PQuantity}</span>
                                <button
                                  className="btn btn-sm btn-danger ms-2"style={{marginLeft: "15px"}}
                                  onClick={() => handleDelete(val.Cart_id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <h5>No products added to cart.</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Summary</h3>
                <div className="summary-item">
                  <span className="text">Subtotal</span>
                  <span className="price">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="text">GST (18%)</span>
                  <span className="price">₹{(totalPrice * 0.18).toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="text">Total</span>
                  <span className="price">
                    ₹{(totalPrice + totalPrice * 0.18).toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={Orderplace}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
