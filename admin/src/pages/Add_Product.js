import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function AddProduct() {
  const [list, setlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getcategory")
      .then((response) => {
        setlist(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load data",
          confirmButtonText: "OK",
        });
      });
  }, []);

  const handleSubmit = () => {
    const Product_Name = document.getElementById("Product_Name").value;
    const Category_id = document.getElementById("Category_id").value;
    const Price = document.getElementById("Price").value;
    const PQuantity = document.getElementById("PQuantity").value;
    const Image = document.getElementById("Image").files[0];
    const PDecription = document.getElementById("PDecription").value;

    if (!Product_Name || !Category_id || !Price || !PDecription || !Image || !PQuantity) {
      Swal.fire({
        title: "Error",
        text: "All fields are required",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("Product_Name", Product_Name);
    formData.append("Category_id", Category_id);
    formData.append("Price", Price);
    formData.append("PQuantity", PQuantity);
    formData.append("Image", Image);
    formData.append("PDecription", PDecription);

    Axios.post("http://localhost:1337/api/insertproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data.message) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
          }).then(() => {
            window.location = "/Menugrid";
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Event inserted successfully!",
          }).then(() => {
            window.location = "/Menugrid";
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while inserting the event.",
        });
      });
  };

  const validateImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
      if (!validExtensions.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please upload an image file (jpg, jpeg, or png).",
        });
        event.target.value = "";
      }
    }
  };

  return (
    <>
      <div
        className="ms-panel ms-panel-fh"
        style={{
          marginTop: "59px",
          marginLeft: "20px",
          height: "65vh",
          width: "74vw",
        }}
      >
        <div className="ms-panel-header">
          <h6>Add Product Form</h6>
        </div>
        <div className="ms-panel-body">
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="Product_Name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="Product_Name"
                name="Product_Name"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Category_id">Select Category</label>
              <select
                className="form-control"
                id="Category_id"
                name="Category_id"
              >
                <option value="">Select Category</option>
                {list.map((cat) => (
                  <option value={cat.Category_id} key={cat.Category_id}>
                    {cat.Category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Price">Price</label>
              <input
                type="number"
                className="form-control"
                id="Price"
                name="Price"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="Price">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="PQuantity"
                name="PQuantity"
              />
            </div>

            <div className="col-md-12 mb-3">
              <label htmlFor="PDecription">Description</label>
              <textarea
                id="PDecription"
                className="form-control"
                name="PDescription"
              />
            </div>

            <div className="col-md-12 mb-3">
              <label htmlFor="Image">Product Image</label>
              <input
                type="file"
                className="form-control-file"
                id="Image"
                name="Image"
                onChange={validateImage}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
