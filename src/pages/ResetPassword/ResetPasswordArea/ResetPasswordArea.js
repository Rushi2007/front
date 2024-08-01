import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

function ResetPasswordArea() {
    const [password , setPassword]= useState('')
    const storedUserEmail = localStorage.getItem("email");

    const navigate = useNavigate();

   
  async function changePassword() {
    try {
      // Make an API call to reset the password
      const response = await Axios.put("http://localhost:8081/reset/password", {
        email: storedUserEmail,
        password: password,
      });

      // Check if the password was updated successfully
      if (response.data && response.data.message) {
        Swal.fire("Success!", "Password updated successfully!", "success");
        
        localStorage.removeItem('email');
        navigate("/login")
      } else {
        Swal.fire("Error", "Password update failed", "error");
      }
    } catch (error) {
      console.error("Error while updating password", error);
      Swal.fire("Error", "Internal server error", "error");
    }
  }


  return (
    <div>
         <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <form>
                  <label htmlFor="email" className="mb-2">
                    <h5 className="theme-color">
                      Enter your new password
                     
                    </h5>
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                  />

                  <button
                    className="primary_btn btn-icon-green w-100"
                    type="button"
                    onClick={changePassword}
                  >
                    Reset password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ResetPasswordArea