import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";
function Addcategory() {
  function Category() {

    const Category_name = document.getElementById("Category_name").value;
    const Description = document.getElementById("Description").value;
    if (!Category_name || !Description) {
      Swal.fire({
        title: 'Error',
        text: 'All fileds are required',
        icon: 'error',
        confirmButtonText: 'ok'
      });
      return;
    }

    Axios.post("http://localhost:1337/api/Categoryprocess", {
      Category_name: Category_name,
      Description: Description
    }).then((response) => {
      Swal.fire({
        title: 'Success',
        text: response.data.massage || 'category inserted successful',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location = "/Dashboard"
      })

    })
  }

  return (
    <>
      <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="ms-panel ms-panel-fh" style={{ width: '56vw', height: '40vh' }}>
          <div className="ms-panel-header">
            <h6>Add Category</h6>
          </div>
          <br></br>
          <div className="ms-panel-body">

            {/* <div className="form-row">
        <div className="col-md-12 mb-3">
          <label htmlFor="validationCustom18">Category ID</label>
          <div className="input-group">
            <input 
              type="number" 
              className="form-control" 
              id="validationCustom18" 
              placeholder="Category ID" 
              required 
            />

          </div>
        </div>
        </div> */}

            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom24">Category Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="Category_name"
                  placeholder="Category Name"
                  required
                />

              </div>
            </div>


            <div className="col-md-12 mb-3">
              <label htmlFor="validationCustom12">Description</label>
              <div className="input-group">
                <textarea
                  rows="5"
                  id="Description"
                  className="form-control"
                  placeholder="Description"
                  required
                />
                <div className="invalid-feedback">Please provide a description.</div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary" onClick={Category}>Submit</button>
            </div>


          </div>
        </div>
      </div>
      </div>
    </>
  );
}
export default Addcategory;