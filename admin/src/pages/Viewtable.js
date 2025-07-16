import React ,{useEffect,useState} from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Viewtable(){
  const [list, setlist] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:1337/api/gettable')
    .then((response)=>{
      setlist(response.data);
    })
  })

  const handledelete=(table_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want be able to revert this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "cancel"
    }).then((result)=>{
      if(result.isConfirmed){
        Axios.delete(`http://localhost:1337/api/table_Delete/${table_id}`)
        .then((response)=>{
          setlist(list.filter(item =>item.table_id!== table_id));
          Swal.fire(
            'deleted',
            'your file has been deleted',
            'success'
          );
        })
      }
      else{
        Swal.fire(
          'cancel',
          'your file is safe',
          'info'
        );
      }
    });
  }
  
    return(
        <>
       <div className="col-lg-12 stretch-card">
              <div className="card" style={{width:'56%' , minWidth:'56%'}}> 
                <div className="card-body">
                  <h4 className="card-title">View Table</h4>
                  <p className="card-description">
                    Table
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>
                            Table No
                          </th>
                        
                          <th>
                          Seating capacity
                          </th>
                          <th>
                            Status
                          </th>
                          <th>
                            QR Code
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((val,index)=>(
                          <tr key={val.table_id}>
                            {<td> {index + 1}</td> }
                            <td> {val.table_no}</td>
                            <td>{val.seating_capacity}</td>
                            <td>{val.Status}</td>
                            <td><img src={`http://localhost:1337/${val.QRcode}`} alt={val.QRcode}/></td>
                            <td>
                            <Link to="/Edittable" state={{table_id: val.table_id}} className="btn btn-success">Edit</Link>&nbsp;&nbsp;
                            <a className="btn btn-danger" onClick={()=>handledelete(val.table_id)}>Delete</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </>
    );

}
export default Viewtable;
