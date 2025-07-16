import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function Review() {
  const [Full_Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone_No, setPhone] = useState("");
  const [Product_Name, setProduct] = useState("");
  const [Rating, setRating] = useState(0);
  const [Message, setMessage] = useState("");
  const [table_no, setTableNumber] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getproduct")
      .then((response) => {
        setList(response.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load data",
        });
      });
  }, []);

  useEffect(() => {
    const storedTableNo = localStorage.getItem("tableNumber");
    if (storedTableNo) {
      setTableNumber(storedTableNo);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(Full_Name)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Name should contain only letters and spaces.",
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(Email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(Phone_No)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Phone number must be 10 digits.",
      });
      return;
    }

    if (!Rating || !Message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete!",
        text: "Please fill in all fields and give a rating.",
      });
      return;
    }

    Axios.post("http://localhost:1337/api/review", {
      Full_Name,
      Email,
      Phone_No,
      Rating,
      Product_Name,
      Message,
      table_no,
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Review sent",
          text: "Thanks for your review",
        });

        setName("");
        setEmail("");
        setPhone("");
        setRating(0);
        setProduct("");
        setMessage("");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <>
      <section className="book_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Review</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={Full_Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      value={Phone_No}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="form-control"
                      value={Product_Name}
                      onChange={(e) => setProduct(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Food
                      </option>
                      {list.map((pd) => (
                        <option key={pd.Menu_id} value={pd.Product_Name}>
                          {pd.Product_Name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      className="form-control"
                      value={Rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="" disabled>
                        How many Ratings?
                      </option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      className="form-control"
                      placeholder="Your Message"
                      value={Message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="btn_box">
                    <button type="submit"onClick={handleSubmit}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <div id="googleMap"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
