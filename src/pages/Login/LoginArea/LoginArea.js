import React, { useState, useEffect } from "react";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Register from "../../Register/Register";
import ForgotPassword from "../../ForgotPassword/ForgotPassword";
import "./LoginArea.css";
import { NavItem } from "react-bootstrap";

const LoginArea = ({data}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('comming data on login page',location.state.data)
  // let procedureData = location.state ? location.state.data :'1' ;
  // console.log('data on login area',data.data)
  // let procedureData = data.data;
  console.log(data);
  
  const procedureData = data ? data : '';

  const login = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8081/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        const { message, username, patient_id, name, provider_id, sessionId } =
          response.data;
        // setLoginStatus(message);

        if (message) {
          if (sessionId) {
            const sessionKey = Object.keys(sessionId)[0];
            const sessionExpirationTime = new Date(
              sessionId[sessionKey].expirationTime
            );
            localStorage.setItem("sessionKey", sessionKey);
            localStorage.setItem(
              "sessionExpirationTime",
              sessionExpirationTime
            );
          }
          if (username) {
            localStorage.setItem("username", username);
            localStorage.setItem("patient_id", patient_id);
            // Swal.fire({
            //   title: "success!",
            //   text: "Login Scessfully..",
            //   icon: "success",
            //   confirmButtonColor: "8fb569",
            //   confirmButtonText: "OK",
            //   customClass: {
            //     popup: 'custom-popup-class'
            //   }
            // });
           procedureData ? navigate("/shopDetails" , {state:{procedureData}}) : navigate("/BookAppointment");
          //navigate('/BookAppointment')
          } else {
            localStorage.setItem("name", name);
            localStorage.setItem("provider_id", provider_id);
            // Swal.fire({
            //   title: "success!",
            //   text: "Login Scessfully..",
            //   icon: "success",
            //   confirmButtonColor: "8fb569",
            //   confirmButtonText: "OK",
            //   customClass: {
            //     popup: 'custom-popup-class'
            //   }

            // });

            navigate("/DoctorProfileArea");
          }
        } else {
          setLoginStatus("");
          localStorage.setItem("userEmail", response.data.email);
          Swal.fire({
            title: "Error!",
            text: "Check Email and Password",
            icon: "error",
            confirmButtonColor: "8fb569",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Check Email and Password",
          icon: "error",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <>
      <section className="login-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="basic-login">
                <h3 className="text-center mb-60">Login From Here</h3>
                {errorMessage && (
                  <h1
                    style={{
                      color: "red",
                      fontSize: "15px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    {errorMessage}
                  </h1>
                )}
                <form>
                  <label htmlFor="name" className="mb-2">
                    <h5 className="theme-color">
                      Email Address <span>*</span>
                    </h5>
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    id="name"
                    type="text"
                    // placeholder="Enter Username or Email address..."
                  />

                  <label htmlFor="pass" className="mb-2">
                    <h5 className="theme-color">
                      Password <span>*</span>
                    </h5>
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    id="pass"
                    type="password"
                    // placeholder="Enter password..."
                  />

                  <div className="login-action mb-20 fix">
                    <span className="log-rem f-left">
                      <input id="remember" type="checkbox" />
                      <label htmlFor="remember">Remember me!</label>
                    </span>
                    <span className="forgot-login f-right">
                      <Link to="/ForgotPassword">
                        <button type="button" class="btn btn-link">
                          <span>Forgot your password?</span>
                        </button>
                      </Link>{" "}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="primary_btn btn-icon-green w-100"
                    onClick={login}
                  >
                    Login Now
                  </button>
                  <h1
                    style={{
                      color: "red",
                      fontSize: "15px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    {loginStatus}
                  </h1>
                  <div className="or-divide">
                    <span>or</span>
                  </div>
                  <Link to="/register" state={data}>
                    <button className="primary_btn theme-btn w-100">
                      Register Now
                    </button>
                  </Link>
                </form>
                <div className="or-divide or-login">
                  <span>or login with</span>
                </div>
                <button className="login_btn">
                  <img src="img/icon/google_icon.svg" alt="" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginArea;
