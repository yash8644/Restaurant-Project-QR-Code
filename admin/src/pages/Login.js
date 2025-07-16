import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";


function Login(){
  function adminlogin(){
    var Owner_email=document.getElementById("Owner_email").value;
    var Owner_pass=document.getElementById("Owner_pass"). value;
    if(!Owner_email || !Owner_pass){
      Swal.fire({
        title: 'Error',
        text:'Both fileds are required',
        icon: 'error',
        confirmButtonText: 'ok'
      });
      return;
    }

    Axios.post('http://localhost:1337/api/loginprocess',{
      Owner_email: Owner_email,
      Owner_pass: Owner_pass

    }).then((response)=>{
      if(response.data.message){
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: response.data.message
        }).then(() => {
          window.location = "/";
        })
      }
      else{
        let obj={
        Owner_email: response.data[0].Owner_email
        };
        sessionStorage.setItem('mydata', JSON.stringify(obj))
        
        Swal.fire({
          icon: 'success',
          title: 'Login successfully',
          text: `welcome ${Owner_email}`

        }).then(()=> {
          window.location ="/Dashboard"
        })
      }
    })
  
  }
    return(
        <>
        <div className="container-scroller" style={{ minHeight:'80vh', minWidth:'90vw'}}>
    <div className="container-fluid page-body-wrapper full-page-wrapper" style={{display:'flex' }}>
      <div className="content-wrapper d-flex align-items-center auth">
        <div className="row w-100">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left p-5">
              <div className="brand-logo">
                <img src="images/Royal 2.jpeg" style={{width:'200px', height: '150px', display:"flex" , alignContent:"center"}} alt="logo"/>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light"> </h6>
              
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="Owner_email" placeholder="Username"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" id="Owner_pass" placeholder="Password"/>
                </div>
                <div className="mt-3">
                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" onClick={adminlogin}>Login</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="/Changepass" className="auth-link text-black">Forgot password?</a>
                </div>
               
                
             
            </div>
          </div>
        </div>
      </div>
      
    </div>
   
  </div>
        </>
    );
}
export default Login;