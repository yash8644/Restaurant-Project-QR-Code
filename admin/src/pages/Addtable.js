import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Addtable() {
    function addtable() {

        const table_no=document.getElementById("table_no").value;
        const seating_capacity=document.getElementById("seating_capacity").value;
        // var Status=document.getElementById("Status").value;
     
        if ( !table_no || !seating_capacity){
               Swal.fire({
                title: 'Error',
                text:'All fields are required',
                icon: 'error', 
                confirmButtonText: 'OK'
               }); 
               return;
            }
            Axios.post("http://localhost:1337/api/addtable",{
                table_no: table_no,
                seating_capacity: seating_capacity,
                // Status: Status

      }).then((response)=>{
        Swal.fire({
            title: 'Success',
            text: response.data.message || 'Table Details inserted successful',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(()=>{
            window.location="/Viewtable"
        });
      }).catch((error) => {
        Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
    });
    });
    }
    return(
        <>
        <main id="main" className="main">
        <div className="pagetitle">
                    {/* 
                     */}
                    <nav>
                        {/* <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a>Table Management</a></li>
                            <li className="breadcrumb-item active">Add Table</li>
                        </ol> */}
                    </nav>
                </div>
                <section className="section">
                <div className="col-lg-6" style={{width: "200%"}}>
                <div className="card">
                <div className="card-body">
                <div className="col-12">
                  <label htmlFor="table_no" className="form-label">Table No.</label>
                  <input type="text" className="form-control" id="table_no"/>
                </div>
                <div className="col-12">
                  <label htmlFor="seating_capacity" className="form-label">Seating Capacity</label>
                  <input type="number" className="form-control" id="seating_capacity"/>
                </div>
                <div className="text-center" style={{textAlign: 'center', marginTop: '25px'}}>
                  <button type="submit" className="btn btn-primary" onClick={addtable}>Submit</button>&nbsp;&nbsp;
                  <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
                </div>
                </div>
                </div>
                </section>
        </main>
        </>
    );
}
export default Addtable;
