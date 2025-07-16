import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";


function MenuGrid() {
  const [list, setlist] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:1337/api/getproduct')
      .then((response) => {
        setlist(response.data);
      });
  }, []);  // Added empty dependency array to prevent infinite loop of requests

  const handledelete = (Menu_id) => {
    //alert(Menu_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:1337/api/Product_Delete/${Menu_id}`)
          .then((response) => {
            setlist(list.filter(item => item.Menu_id !== Menu_id));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          });
      } else {
        Swal.fire(
          'Cancelled',
          'Your file is safe',
          'info'
        );
      }
    });
  };
  return (

    <div className="content-wrapper" style={{backgroundImage:"menugrid bi.jpg"}}>
    <div className="page-header">
      <h3 className="page-title">
        Menu Grid
      </h3>
    </div>
    <div className="row" style={{marginLeft:"0px"}} >
    {list.map((val) => (
                <div className="col-xl-3 lg:col-lg-4 col-md-6 col-sm-6" key={val.Menu_id} >
                  <div className="ms-card" style={{width:"80%"}}>
                    <div className="ms-card-img">
                    <img src={`http://localhost:1337/${val.Image}`} alt={val.Image} />
                    </div>
                    <div className="ms-card-body" style={{position: "relative",       fontSize: "14px"}}>
                      <div className="new">
                        <h6 className="mb-0">{val.Product_Name}</h6>
                        <h6 className="ms-text-primary mb-0">₹{val.Price}</h6>
                      </div>
                      <div className="new meta">
                        <p>{val.PQuantity}</p>
                        <span className="badge badge-success">In Stock</span>
                      </div>
                      <p>{val.PDecription}</p>
                      <div className="new mb-0">
                        <button type="button" className="btn grid-btn mt-0 btn-sm btn-primary" onClick={() => handledelete(val.Menu_id)}>Remove</button>
                        <Link to='/EditMenu' state={{ Menu_id: val.Menu_id }} className="btn grid-btn mt-0 btn-sm btn-secondary">Edit</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
    </div>
  </div>


    
  );
}

export default MenuGrid;
