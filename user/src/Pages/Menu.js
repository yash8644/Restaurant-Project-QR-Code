import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Menu() {
  
  const [list, setlist] = useState([]);
  const location = useLocation();
  const Category_id = location.state?.Category_id;

  // Fetch data when Category_id changes
  useEffect(() => {
    if (Category_id) {
      Axios.post('http://localhost:1337/api/Editcategorydatafetch', { Category_id })
        .then((response) => {
          console.log("Data fetched: ", response);  // Debugging line
          setlist(response.data);
        })
        .catch(error => console.error("Error fetching data: ", error));
    }
  }, [Category_id]);

  const addcart = (Menu_id) => {
    const table_no = localStorage.getItem("tableNumber");

   // console.log("addcart triggered", Menu_id, table_no);  // Debugging line

    if (Menu_id && table_no) {
      Axios.post("http://localhost:1337/api/addtocart", {
          Menu_id,
          table_no,
      })
      .then((response) => {
        console.log("Response from addtocart API: ", response);  // Debugging line
        if (response.data.message) {
          // Update localStorage cart
          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          if (!cartItems.includes(Menu_id)) {
            cartItems.push(Menu_id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }

          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: response.data.message,
          });
        } else {
          console.log("No message in response");  // Debugging line
        }
      })
      .catch((error) => {
        console.error("Error during add to cart: ", error);  // Debugging line
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
        });
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please make sure you have selected a valid product and table number.',
      });
    }
  };

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Our Menu</h2>
        </div>

        <div className="filters-content">
          <div className="row grid">
            {list && list.length > 0 ? (
              list.map((val, index) => (
                <div className="col-sm-6 col-lg-4 all pizza" key={index}>
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={`http://localhost:1337/${val.Image}`} alt={val.Product_Name} />
                      </div>
                      <div className="detail-box">
                        <h5>{val.Product_Name}</h5>
                        <p>{val.PDecription}</p>
                        <div className="options">
                          <h6>₹{val.Price}</h6>
                          <button
                            className="btn-primary"
                            onClick={() => addcart(val.Menu_id)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <h2>No products available.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
