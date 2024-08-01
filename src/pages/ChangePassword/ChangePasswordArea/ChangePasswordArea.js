import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import ManageProcedure from "../../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure";


const ChangePasswordArea = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState('');

  const reset = () => {
    setNewPassword("");
    setOldPassword("");
  }
  const validateForm = () => {
    if (oldPassword.trim() === '') {
      setError('Please enter the old password.');
      return false;
    }

    if (newPassword.trim() === '') {
      setError('Please enter the new password.');
      return false;
    }

    if (oldPassword === newPassword) {
      setError('New password must be different from the old password.');
      return false;
    }

    setError(''); // Clear any previous error messages
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedPId = localStorage.getItem("provider_id");
      if (storedPId) {
        axios
          .put(`http://localhost:8081/providerchangepass/${storedPId}`, {
            oldpassword: oldPassword,
            newpassword: newPassword,
          })
          .then((response) => {
            Swal.fire({
              title: 'success!',
              text: 'Password Updated..',
              icon: 'success',
              confirmButtonColor: '8fb569',
              confirmButtonText: 'OK',
            });

            reset();
            console.log(response.data); // Password updated successfully
            // Add any additional logic or state updates here
          })
          .catch((error) => {
            console.error(error);
            if (error.response) {
              Swal.fire({
                title: 'Error!',
                text: 'Errorin password change..',
                icon: 'error',
                confirmButtonColor: '8fb569',
                confirmButtonText: 'OK',
              });

            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Error in password change..',
                icon: 'error',
                confirmButtonColor: '8fb569',
                confirmButtonText: 'OK',
              });

            }
          });
      }
    }
  };

  return (
    <>
      <div>
        <div className="col py-3">
          <section className="login-area pt-50 pb-80">
            <div className="container-fluid">
              <div className="row flex-nowrap">
                <div
                  class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
                  style={{ backgroundColor: "#223645" }}
                >              <br></br>
                  <ManageProcedure />
                </div>
                <div>
                  <section className="col-lg-9">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="basic-login">
                            <h2 className="text-center mb-60">Change Password</h2>
                            <br></br>
                            <form action="#">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="checkbox-form">
                                    <br />
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="checkout-form-list">
                                          <label>
                                            Old Password <span className="required">*</span>
                                          </label>
                                          <input
                                            type="password"
                                            id="old-password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder=""
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="checkout-form-list">
                                          <label>
                                            New Password <span className="required">*</span>
                                          </label>
                                          <input
                                            type="password"
                                            id="new-password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder=""
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12 text-center mt-40 form-group">
                                        {error && <div className="error-message " style={{color: "red"}}>{error}</div>}
                                        <br></br><br></br>
                                        <button
                                          type="submit"
                                          className="primary_btn btn-icon-green w-20"
                                          onClick={handleSubmit}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordArea;
