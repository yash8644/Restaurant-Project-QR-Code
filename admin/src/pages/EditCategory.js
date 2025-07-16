import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function EditCategory() {
  const location = useLocation();
  const Category_id = location.state?.Category_id;
  
  const [categorydata, setcatdata] = useState({
    Category_id: "",
    Category_Name: "",
    PDescription: "",
  });

  useEffect(() => {
    if (Category_id) {
      Axios.post('http://localhost:1337/api/Editcategorydata', { Category_id })
        .then((response) => {
          setcatdata(response.data);
        });
    }
  }, [Category_id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcatdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if(categorydata.Category_Name && categorydata.PDescription) {
        Axios.post('http://localhost:1337/api/Categoryupdate', categorydata)
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Category data updated successfully!'
            }).then(() => {
                window.location = "/Viewcategory";
            });
        })
    }
    else{
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Please fill in all the fields'
        })
        
    }
}

  return (
    <div className="ms-panel ms-panel-fh" style={{ width: '56vw', height: '40vh' }}>
      <div className="ms-panel-header">
        <h6>Edit Category</h6>
      </div>
      <br />
      <div className="ms-panel-body">
      <input type='hidden' className='form-control' id='Category_id' name="Category_id" value={categorydata.Category_id}/>
          <div className="col-md-6 mb-3">
            <label htmlFor="Category_name">Category Name</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="Category_name"
                placeholder="Category Name"
                value={categorydata.Category_Name}
                name="Category_name"
                onChange={handleChange}
                
              />
            </div>
          </div>

          <div className="col-md-12 mb-3">
            <label htmlFor="Description">Description</label>
            <div className="input-group">
              <textarea
                rows="5"
                id="Description"
                className="form-control"
                placeholder="Description"
                value={categorydata.PDescription}
                name="Description"
                onChange={handleChange}
              
              />
              <div className="invalid-feedback">Please provide a description.</div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
     
      </div>
    </div>
  );
}

export default EditCategory;
