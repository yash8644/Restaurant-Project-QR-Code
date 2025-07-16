import React, { useEffect, useState  } from "react";
import Swal from "sweetalert2";
import  Axios  from "axios";
import { useLocation } from "react-router-dom";

function Edittable() {
    const location = useLocation();
  const table_id = location.state?.table_id;
  
  const [tabledata, setcatdata] = useState({
    table_id: "",
    table_no: "",
    seating_capacity: "",
  });

  useEffect(() => {
    if (table_id) {
      Axios.post('http://localhost:1337/api/Editabledata', { table_id: table_id })
        .then((response) => {
          setcatdata(response.data);
        });
    }
  }, [table_id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcatdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if(tabledata.table_no && tabledata.seating_capacity) {
        Axios.post('http://localhost:1337/api/tableupdate', tabledata)
        .then((response) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Table data updated successfully!'
            }).then(() => {
                window.location = "/Viewtable";
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
    <>
      {/* <div className="ms-panel ms-panel-fh" style={{ width: '56vw', height: '40vh' }} /> */}
      <div className="ms-panel-header">
        {/* <h6>Edit Table</h6> */}
      </div>
      <div className="ms-panel-body"style={{ width: '56vw', height: '40vh' }}>
        <div className="col-md-6 mb-3">
          <label htmlFor="table_no">Table No</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="table_no"
              name="table_no"
              value={tabledata.table_no}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="seating_capacity">Seating Capacity</label>
          <div className="input-group">
            <textarea
              className="form-control"
              id="seating_capacity"
              name="seating_capacity"
              value={tabledata.seating_capacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Edittable;
