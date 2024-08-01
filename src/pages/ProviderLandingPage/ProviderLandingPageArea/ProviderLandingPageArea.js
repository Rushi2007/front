import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddNewProcedureArea from "../../AddNewProcedure/AddNewProcedureArea/AddNewProcedureArea";
import UpdateProcedureArea from "../../UpdateProcedure/UpdateProcedureArea/UpdateProcedureArea";
import ManageProcedure from "../ProviderLandingPageArea/ManageProcedure";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import "../../DoctorProfile/DoctorProfileArea/Doctor.css";
// import './modal.css';

function ProviderLandingPageArea() {
  const [showAddNewProcedureArea, setShowAddNewProcedureArea] = useState(false);
  const [showUpdateProcedureArea, setShowUpdateProcedureArea] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showProcedure, setshowProcedure] = useState(true);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [procedures, setProcedures] = useState([]);
  const [name, setUsername] = useState("");
  const [pId, setPId] = useState("");
  const navigate = useNavigate();
  const [procedureOne, setprocedureOne] = useState([]);
  const [selectedProcedurelist, setselectedProcedurelist] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
      console.log("provider name", storedUsername);
    }
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      setPId(storedPId);
      console.log("provider id", storedPId);
    }

    const fetchData = async () => {
      try {
        // console.log(providers_id);
        await fetch(
          `http://localhost:8081/provider/procedure/search/${storedPId}`
        )
          .then((response) => response.json())
          .then((result) => {
            setProcedures(result.procedures);
            console.log("new1==>", setProcedures(result.procedures));
            // console.log("Procedure:",procedures);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchprocedure = async () => {
      try {
        // console.log(providers_id);
        if (selectedProcedurelist) {
          await fetch(
            `http://localhost:8081/provider/procedures/search/${selectedProcedurelist}`
          )
            .then((res) => res.json())
            .then((data) => setprocedureOne(data.procedure))
            .catch((err) => console.log(err));
        } else {
          setprocedureOne([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchprocedure();
    // Adding a timeout of 2 seconds before executing the fetchProcedure function
    const timeoutId = setTimeout(() => {
      fetchprocedure();
    }, 2000);

    // Clean up the effect and clear the timeout
    return () => clearTimeout(timeoutId);
  }, [selectedProcedurelist]);

  const handlesetselectedProcedurelistChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Procedure:", selectedValue);
    setselectedProcedurelist(selectedValue);
    setShowResult(true);
  };

  const handleShowUpdateProcedureArea = (procedure) => {
    setSelectedProcedure(procedure);
    setShowAddNewProcedureArea(false);
    setShowUpdateProcedureArea(true);
    setshowProcedure(false);
  };

  const handleshowAddNewProcedureArea = () => {
    setShowAddNewProcedureArea(true);
    setShowUpdateProcedureArea(false);
    setshowProcedure(false);
    // setshowcalanderAppoinment(false);
  };

  const handleDelete = async (id) => {
    console.log(id);

    // Swal({
    //   // title: "Are you sure?",
    //   text: "Are you sure? ,Once deleted, you will not be able to recover this!",
    //   // icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    //   cancelButtonText: "Cancel",
    //    timer: 5000, // Timer set to 5 seconds (5000 milliseconds)
    //   timerProgressBar: true, // Show a progress bar during the timer duration
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    const response = await axios.delete(
      `http://localhost:8081/procedures/delete/${id}`
    );
    // console.log(response.status)
    if (response.status == 200) {
      //    Swal.fire({
      //   title: 'success!',
      //   text: 'Procedure Deleted..',
      //   icon: 'success',
      //   confirmButtonColor: '#8fb569',
      //   confirmButtonText: 'OK',
      // });
      alert("Procedure Deleted sucessfully");
    }
    // if (response.status==id ) {
    //   Swal.fire({
    //     title: 'success!',
    //     text: 'Procedure Deleted..',
    //     icon: 'success',
    //     confirmButtonColor: '#8fb569',
    //     confirmButtonText: 'OK',
    //   });

    // }
  };

  return (
    <div>
      <div className="col py-3">
        <section className="login-area pt-50 pb-80">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div
                class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
                style={{ backgroundColor: "#223645" }}
              >
                {" "}
                <br></br>
                <ManageProcedure />
              </div>
              <div className="col-lg-9  justify-content-center">
                {showAddNewProcedureArea && <AddNewProcedureArea />}
                {showUpdateProcedureArea && (
                  <UpdateProcedureArea procedure={selectedProcedure} />
                )}
                {showProcedure && (
                  <div className="basic-login">
                    <h2 className="text-center mb-60">Manage Procedures</h2>

                    <form className="service-contact-form" action="">
                      <form className="service-contact-form" action="">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="contact-input contact-icon contact-hourglass">
                              <h4>
                                <select
                                  onChange={
                                    handlesetselectedProcedurelistChange
                                  }
                                  className="form-select select_style form-group"
                                  aria-label="Default select example"
                                >
                                  <option
                                    defaultValue="Select Procedure"
                                    value=""
                                  >
                                    Select Procedure
                                  </option>
                                  {procedures.map((procedure) => (
                                    <option
                                      key={procedure.id}
                                      value={procedure.id}
                                    >
                                      {procedure.pname}
                                    </option>
                                  ))}
                                </select>
                              </h4>
                            </div>
                          </div>

                          <div className="col-md-12 text-center mt-40 form-group">
                            <button
                              type="submit"
                              className="primary_btn btn-icon-green w-50"
                              onClick={handleshowAddNewProcedureArea}
                            >
                              Add Procedure
                            </button>
                          </div>

                          {showResult && (
                            <div className="col-lg-12 mt-4">
                              <table className="table table-striped table-hover select_style">
                                <thead>
                                  <tr className="col-xs-12">
                                    <th className="col-xs-4"></th>
                                    <th className="col-xs-5">Procedure Name</th>
                                    <th className="col-xs-3">Action</th>
                                  </tr>
                                </thead>
                                <tbody style={{ verticalAlign: "middle" }}>
                                  {procedureOne.map((procedure, index) => (
                                    <tr
                                      key={procedure.id}
                                      className="col-xs-12"
                                    >
                                      <td className="col-xs-4">
                                        <img
                                          src={procedure.procedure_image} // Replace 'imageURL' with the actual property name that holds the image URL in your 'doctor' object
                                          alt="Doctor"
                                          style={{
                                            maxWidth: "4rem",
                                            maxHeight: "3rem",
                                            objectFit: "contain",
                                          }} // Ensure the image fits within the table cell
                                        />
                                      </td>
                                      <td className="col-xs-5">
                                        {procedure.pname}
                                      </td>
                                      {/* <td>
                                        <div className="d-flex flex-column flex-sm-row">
                                          <button
                                            className="primary_btn btn-icon-green mb-2 mb-sm-0 me-sm-2 btn-sm"
                                            onClick={() => {
                                              handleShowUpdateProcedureArea(
                                                procedure
                                              );
                                            }}
                                          >
                                            Update
                                          </button>
                                          <button
                                            className="primary_btn btn-icon-green btn-sm"
                                            onClick={() =>
                                              handleDelete(procedure.id)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td> */}
                                      <td className="col-xs-3">
                                        <div className="d-flex flex-sm-row">
                                          <FaRegEdit
                                            className="editicon"
                                            onClick={() => {
                                              handleShowUpdateProcedureArea(
                                                procedure
                                              );
                                            }}
                                          />

                                          <FaTrash
                                            className="deleteicon"
                                            onClick={() =>
                                              handleDelete(procedure.id)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </form>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default ProviderLandingPageArea;
