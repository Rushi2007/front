import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ForgotPasswordArea = () => {
  const [email, setEmail] = useState("");


 

  const sendEmail = async () => {
    try {
      const response = await Axios.post("http://localhost:8081/aws/email", {
        email: email,
      });
      localStorage.setItem('email', email);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Email sent! Please check your inbox",
          icon: "success",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
         
          
          
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send email. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",

        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

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
                      Enter your email to receive a password reset link
                      <span>*</span>
                    </h5>
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    id="email"
                    type="email"
                    placeholder="Enter Email address..."
                  />

                  <button
                    className="primary_btn btn-icon-green w-100"
                    type="button"
                    onClick={sendEmail}
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
  );
};

export default ForgotPasswordArea;
