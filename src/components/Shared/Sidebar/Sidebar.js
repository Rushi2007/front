import React from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ show, handleClose }) => {
  const patient_id = localStorage.getItem("patient_id");
  const provider_id = localStorage.getItem("provider_id");
  // console.log("afterlogin==>", patient_id);
  // console.log("afterlogin==>", provider_id);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("patient_id");
    localStorage.removeItem("username");
    localStorage.removeItem("provider_id");
    localStorage.removeItem("name");
  };

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="side__bar"
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <ul>
            <li>
              <NavLink to="/" isActive={() => location.pathname === "/"}>
                Home
              </NavLink>
            </li>
            {/* <li>
                     <NavLink to="/login" isActive={() => location.pathname === '/login'}>
                        Provider
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/doctorDetails" isActive={() => location.pathname === '/doctorDetails'}>
                        Doctors
                     </NavLink>
                  </li> */}
            <li>
              <NavLink
                to="/contact"
                isActive={() => location.pathname === "/contact"}
              >
                Contact
              </NavLink>
            </li>
            {provider_id === null && patient_id === null && (
              <li>
                <NavLink
                  to="/login"
                  isActive={() => location.pathname === "/login"}
                >
                  Login
                </NavLink>
              </li>
            )}
            {provider_id !== null && (
              <li>
                <NavLink to="/" onClick={onLogout}>
                  Logout
                </NavLink>
              </li>
            )}
            {patient_id !== null && (
              <li>
                <NavLink to="/" onclick={onLogout}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
