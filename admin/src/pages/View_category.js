import React ,{useEffect,useState} from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Viewcategory(){
  const [list, setlist] = useState([]);
  useEffect(()=>{
    Axios.get('http://localhost:1337/api/getcategory')
    .then((response)=>{
      setlist(response.data);
    })
  })

  const handledelete=(Category_id)=>{
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
        Axios.delete(`http://localhost:1337/api/Category_Delete/${Category_id}`)
        .then((response)=>{
          setlist(list.filter(item =>item.Category_id!== Category_id));
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
                  <h4 className="card-title">View category</h4>
                  <p className="card-description">
                    Category 
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                        
                          <th>
                            Category name
                          </th>
                          <th>
                            Description
                          </th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((val,index)=>(
                          <tr key={val.Category_id}>
                            <td> {index + 1}</td>
                            <td> {val.Category_name}</td>
                            <td>{val.Description}</td>
                            <td>
                            <Link to="/EditCategory" state={{Category_id: val.Category_id}} className="btn btn-success">Edit</Link>
                            <a className="btn btn-danger" onClick={()=>handledelete(val.Category_id)}>Delete</a>
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
export default Viewcategory;
