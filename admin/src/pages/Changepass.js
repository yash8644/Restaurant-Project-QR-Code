import React from "react";
import Swal from "sweetalert2";
import  Axios  from "axios";

function Changepass() {
  const usersession = sessionStorage.getItem('mydata');

  function password(){
    const parsedata=JSON.parse(usersession);

    // alert(parse.data);
    const currentPassword=document.getElementById("currentPassword").value
    const NewPassword=document.getElementById("NewPassword").value;
    const ConfirmPassword=document.getElementById("ConfirmPassword").value;

    if(NewPassword !== ConfirmPassword){
      
        Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'New password and confirm Password do not Match'
                })
                return;

    }

    Axios.post("http://localhost:1337/api/changepassprocess",{
      Owner_email:parsedata.Owner_email,
      currentPassword:currentPassword,
      NewPassword:NewPassword,
    })

    .then((response)=>{
      if(response.data.message){
        alert(response.data.message);
        window.location ="/Login";
      } else {
        alert("Password Updated Successfully!!");
        window.location = "/Login";
      }

    })
    .catch((error)=>{
      console.error("There was an error making the request",error);
      // setError('An error occurred.please try again.');
      alert('An error occurred please try again.');
    });

  }
  return (
    <>
    <div className='yash00'>
      <div className="yash1239">
        <div className="bb" style={styles.authFormBox}>
          <div className="brand-logo">
            <img src="../../images/Royal 2.jpeg" alt="logo" style={styles.logo} />
          </div>
          
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                id="currentPassword"
                placeholder="Current Password"
                style={styles.inputField}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                id="NewPassword"
                placeholder="New Password"
                style={styles.inputField}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                id="ConfirmPassword"
                placeholder="Confirm Password"
                style={styles.inputField}
              />
            </div>
            <div className="mt-3">
              <button
                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                onClick={password}
                style={styles.submitButton}
              >
                Submit
              </button>
            </div>
          
        </div>
      </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyItem: "center",
    height: "200vh",
    padding: "0 20px",
  },
  authFormBox: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "600px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  logo: {
    width: "250px",
    marginBottom: "20px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Changepass;
