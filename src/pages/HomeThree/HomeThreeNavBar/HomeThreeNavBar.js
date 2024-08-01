import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Shared/Sidebar/Sidebar";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useEffect } from "react";
import "./HomeThreeNavBar.css";
import { Row } from "react-bootstrap";

const HomeThreeNavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { stickyMenu } = useGlobalContext();
  const patient_id = localStorage.getItem("patient_id");
  const sessionKey = localStorage.getItem("sessionKey");
  const sessionExpirationTime = localStorage.getItem("sessionExpirationTime");
  const username = localStorage.getItem("username");
  const provider_id = localStorage.getItem("provider_id");
  const name = localStorage.getItem("name");
  // console.log("afterlogin==>", patient_id);
  // console.log("afterlogin==>", provider_id);

  // const isSessionExpired = () => {
  //   if (sessionExpirationTime) {
  //     const currentTime = new Date();
  //     return currentTime > sessionExpirationTime;
  //   }
  //   return true;
  // };
  console.log("session=====>", sessionExpirationTime);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("patient_id");
    localStorage.removeItem("username");
    localStorage.removeItem("provider_id");
    localStorage.removeItem("name");
    localStorage.removeItem("sessionKey");
    localStorage.removeItem("sessionExpirationTime");
    navigate("/");
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=initGoogleTranslate";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Define the function once the Google Translate script is loaded
  window.initGoogleTranslate = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
      },
      "google_translate_element"
    );
    const translateElementContainer = document.getElementById(
      "google_translate_element"
    );

    // Apply CSS styles
    // translateElementContainer.style.opacity = "0"; // Example background color
    // translateElementContainer.style.padding = "10px"; // Example padding
  };

  function handleClick() {
    console.log("button clicked");
  }

  return (
    <>
      <header>
        <div
          style={{
            paddingTop: stickyMenu ? "auto" : "auto",
            paddingBottom: stickyMenu ? "auto" : "auto",
            backgroundColor: stickyMenu ? "#fff" : "transparent",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                <div className="logo logo-3 pos-rel">
                  <Link to="/">
                    <img
                      src="img/logo/logo-3.png"
                      alt=""
                      style={{ height: "5rem", width: "8rem" }}
                    />
                  </Link>
                </div>
              </div>
              <div
                className="col-6 d-lg-none px-0"
                style={{ paddingTop: "5px" }}
              >
                <div className="row">
                  <div className="col-9 px-0">
                    {provider_id !== null && (
                      <>
                        <Link
                          to="/ProviderLandingPage"
                          style={{ color: "red" }}
                        >
                          <div className="header-cta-text text-center">
                            <h5 className="theme-color">
                              <i
                                className="fs-5 fas fa-hospital-user"
                                style={{ color: "black" }}
                              ></i>
                            </h5>
                            <span className="primary-color">{name}</span>
                          </div>
                        </Link>
                      </>
                    )}
                    {patient_id !== null && (
                      <>
                        <Link to="/patientprofile" style={{ color: "red" }}>
                          <div className="header-cta-text text-center">
                            <h5 className="theme-color">
                              <i
                                className="fs-5 fas fa-hospital-user"
                                style={{ color: "black" }}
                              ></i>
                            </h5>
                            <span className="primary-color">{username}</span>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="col-3">
                    <div
                      onClick={handleShow}
                      className="side-menu-icon d-lg-none"
                    >
                      <button className="side-toggle border-0 bg-transparent">
                        <i className="fas fa-bars"></i>{" "}
                      </button>
                      {/* <div>
              <button onClick={handleClick} style={{ color: 'white' }}>Click</button>
            </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10 d-none d-lg-block">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0">
                    <div className="header-cta-info header-cta-info-3 d-flex f-left">
                      <div className="header-cta-icon">
                        <img src="img/cta/message-icon.png" alt="" />
                      </div>
                      <div className="header-cta-text">
                        <h5 className="theme-color">Email Address</h5>
                        <span className="primary-color">
                          info@treatsmart.in
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0">
                    <div className="header-cta-info header-cta-info-3 d-flex f-left">
                      <div className="header-cta-icon">
                        <img src="img/cta/phone-icon.png" alt="" />
                      </div>
                      <div className="header-cta-text">
                        <h5 className="theme-color">Phone Number</h5>
                        <span className="primary-color">+91 7499893791</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0 justify-content-center">
                    <div className="header-cta-info header-cta-info-3 d-flex justify-content-center mx-0">
                      {provider_id !== null && (
                        <>
                          <Link
                            to="/ProviderLandingPage"
                            style={{ color: "red" }}
                          >
                            <div className="header-cta-text text-center">
                              <h5 className="theme-color">
                                <i
                                  className="fs-5 fas fa-hospital-user"
                                  style={{ color: "black" }}
                                ></i>
                              </h5>
                              <span className="primary-color">{name}</span>
                            </div>
                          </Link>
                        </>
                      )}
                      {patient_id !== null && (
                        <>
                          <Link to="/patientprofile" style={{ color: "red" }}>
                            <div className="header-cta-text text-center">
                              <h5 className="theme-color">
                                <i
                                  className="fs-5 fas fa-hospital-user"
                                  style={{ color: "black" }}
                                ></i>
                              </h5>
                              <span className="primary-color">{username}</span>
                            </div>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  {provider_id === null && patient_id === null && (
                    <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0">
                      <div className="header-lang f-right pos-rel d-none d-lg-block p-0">
                        <Link
                          to="/login"
                          className="primary_btn btn-icon ml-0"
                          style={{ marginRight: "11px" }}
                        >
                          <span>+</span>Login
                        </Link>
                      </div>
                    </div>
                  )}

                  {provider_id !== null && (
                    <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0">
                      <div className="header-lang f-right pos-rel d-none d-lg-block p-0">
                        <Link
                          to={"/"}
                          onClick={onLogout}
                          className="primary_btn btn-icon ml-0"
                          style={{ marginRight: "11px" }}
                        >
                          <span>+</span>Logout
                        </Link>
                      </div>
                    </div>
                  )}
                  {patient_id !== null && (
                    <>
                      <div className="col-xl-3 col-lg-3 col-md-3 pos-rel d-none d-lg-block p-0">
                        <div className="header-lang f-right pos-rel d-none d-lg-block p-0">
                          <Link
                            to={"/"}
                            onClick={onLogout}
                            className="primary_btn btn-icon ml-0"
                            style={{ marginRight: "11px" }}
                          >
                            <span>+</span>Logout
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            stickyMenu
              ? "sticky_menu header-menu-area header-menu-blue theme-bg sticky_navBar_bg"
              : "header-menu-area header-menu-blue theme-bg h3_navBar"
          }
          style={{
            maxHeight: stickyMenu ? "4rem" : "4rem",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="header__menu menu-dark">
                  <nav id="mobile-menu">
                    <ul>
                      {(provider_id === null || patient_id !== null) && (
                        <li>
                          <Link to="/" style={{ color: "white" }}>
                            Home
                          </Link>
                        </li>
                      )}
                      {/* {provider_id === null && (
                        <li>
                          <Link to="/doctorDetails" style={{ color: "white" }}>
                            Doctors{" "}
                          </Link>
                        </li>
                      )} */}
                      {provider_id === null && (
                        <li>
                          <Link to="/contact" style={{ color: "white" }}>
                            Contact
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6" style={{ height: "4rem" }}>
                <div className="header-left f-left">
                  <div className="header-social-icons f-right d-none d-lg-block p-0">
                    <ul>
                      <li>
                        <a href="#">
                          {/* <i className="fab fa-facebook-f"></i> */}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {/* <i className="fab fa-behance"></i> */}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {/* <i className="fab fa-youtube"></i> */}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {/* <i className="fab fa-linkedin"></i> */}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {/* <i className="fab fa-pinterest"></i> */}
                        </a>
                      </li>

                      <li style={{ marginTop: "20px" }}></li>
                      {/* <li>
                        <div
                          id="google_translate_element"
                          style={{
                            color: "transparent !important",
                            paddingTop: "1rem",
                          }}
                        ></div>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div
                  className="header-right f-right"
                  style={{ position: "relative", zIndex: "9999" }}
                >
                  <div
                    id="google_translate_element"
                    style={{
                      color: "transparent !important",
                      marginTop: "1rem",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default HomeThreeNavBar;
