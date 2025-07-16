import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

function EditMenu() {
  const location = useLocation();
  const Menu_id = location.state?.Menu_id;

  const [menudata, setmenudata] = useState({
    Menu_id: '',
    Category_id: '',
    Product_Name: '',
    Price: '',
    Image: '',
    PDecription: '',
    PQuantity: ''
  });

  const [list, setlist] = useState([]);  // State for category list

  const handleChange = (e) => {
    const { name, value } = e.target;
    setmenudata(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setmenudata((prevState) => ({
        ...prevState,
        Image: file
      }));
    }
  };  

  useEffect(() => {
    if (Menu_id) {
      Axios.post('http://localhost:1337/api/Editmenudata', { Menu_id: Menu_id })
        .then((response) => {
          setmenudata(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    } else {
      console.log('Menu_id is not available');
    }
  }, [Menu_id]);

  // Fetch categories to populate the select list
  useEffect(() => {
    Axios.get("http://localhost:1337/api/editmenu")
      .then((response) => {
        setlist(response.data);
        //alert(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load data',
          confirmButtonText: 'OK'
        });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Menu_id', menudata.Menu_id);
    formData.append('Category_id', menudata.Category_id);
    formData.append('Product_Name', menudata.Product_Name);
    formData.append('Price', menudata.Price);
    formData.append('PDecription', menudata.PDecription);
    formData.append('PQuantity', menudata.PQuantity);
    if (menudata.Image instanceof File) {
      formData.append('Image', menudata.Image);
    }

    Axios.post('http://localhost:1337/api/update_product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Product updated successfully!'
      });
    }).then(() => {
      window.location="/Menu_Grid"
    }).catch ((error) => {
      console.error("Error during the update:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an issue updating the product!'
      });
    });
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
          <h6>Edit Menu</h6>
        </div>
        <div className="ms-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="Product_Name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Product_Name"
                  name="Product_Name"
                  value={menudata.Product_Name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Category_id">Select Category</label>
                <select
                  name="Category_id"
                  className="form-control"
                  id="Category_id"
                  data-style="py-0"
                  value={menudata.Category_id}
                  onChange={handleChange}
                >
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
                  value={menudata.Price}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Quantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="PQuantity"
                  name="PQuantity"
                  value={menudata.PQuantity}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="PDecription">Description</label>
                <textarea
                  className="form-control"
                  id="PDecription"
                  name="PDecription"
                  value={menudata.PDecription}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-12 mb-3">
                <label htmlFor="Image">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="Image"
                  name="Image"
                  onChange={handleImageChange}
                />
                {menudata.Image && (
                  <img
                    src={'http://localhost:1337/public/' + menudata.Image}
                    alt="Product"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              </div>
            </div>

            <div style={{ textAlign: "center",padding: '10px',display: 'block',gap: '10px' }}>
              <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;
              <button type="Reset" className="btn btn-primary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditMenu;
