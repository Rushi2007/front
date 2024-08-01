import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const durations = ["Month", "Days", "Hours"];

// import { Link } from 'react-router-dom';

const UpdateProcedureArea = ({ procedure }) => {
  const [id, setProcedure_id] = useState("");
  const [pname, setProcedure_name] = useState("");
  const [description, setDescription] = useState("");
  const [doctor, setDoctor] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [provider_id, setProvider_id] = useState("");
  const [speciality, setspeciality] = useState("");
  const [section, setsection] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const storedProviderId = localStorage.getItem("provider_id");
  const [durationtext, setdurationtext] = useState("");

  // New state for options
  const [options, setOptions] = useState([
    { text: "", price: "" },
    // ...other options...
  ]);

  // Initialize with an empty option

  // Function to handle adding an option
  const handleAddOption = () => {
    setOptions([...options, { text: "", price: "" }]);
  };

  // Function to handle removing an option
  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleChangeOptionText = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleChangeOptionPrice = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].price = value;
    setOptions(updatedOptions);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (procedure) {
          setProcedure_id(procedure.id);
          setProcedure_name(procedure.pname);
          setPrice(procedure.price);
          setDescription(procedure.description);
          // setDoctor(selectedDoctor);
          setDuration(procedure.duration);
          setdurationtext(procedure.durationtext);
          setDiscount(procedure.discount);
          setProvider_id(storedProviderId);
          setspeciality(procedure.speciality);
          setsection(procedure.section);
          setFile(procedure.procedure_image);
          setImagePreview(procedure.procedure_image);
          setDoctorId(procedure.doctor_id);
          fetchOption();
        }
        const response = await axios.get(
          `http://localhost:8081/providerprofiles/${procedure.id}`
        );
        const result = response.data;
        setDoctors(result.doctor);
        setSelectedDoctor(procedure.doctor_id);
        console.log("setSelectedDoctor", procedure.doctor_id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchData1();
  }, [procedure]);

  const fetchData1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/provider/doctors/search/${storedProviderId}`
      );
      const result = response.data;
      setDoctors(result.doctors);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOption = async () => {
    console.log("options are id", procedure.id);
    try {
      const response = await axios.get(
        `http://localhost:8081/procedure/option/${procedure.id}`
      );
      const result = response.data;
      console.log("options are", result);
      // Update the options state with fetched data
      setOptions(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = async () => {
    navigate("/ProviderLandingPage");
  };

  const handledurationtext = (e) => {
    const selectedProvider = e.target.value;
    setdurationtext(selectedProvider);
  };
  const handleProcedureRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("pname", pname);
    formData.append("description", description);
    formData.append("doctor_id", selectedDoctor); // Corrected key to "doctor_name"
    formData.append("duration", duration);
    formData.append("durationtext", durationtext);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("provider_id", provider_id);
    formData.append("speciality", speciality);
    formData.append("section", section);
    options.forEach((option, index) => {
      formData.append(`options[${index}][option_text]`, option.text);
      formData.append(`options[${index}][option_price]`, option.price);
    });
    // doctor_id: doctorId,
    try {
      const response = await axios.put(
        `http://localhost:8081/Procedure/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        Swal.fire({
          title: "success!",
          text: "Updated procedure details..",
          icon: "success",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
        });

        // setIsSuccessModalOpen(true);
        navigate("/ProviderLandingPage");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to Updated procedure details..",
          icon: "error",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
        });

        navigate("/ProviderLandingPage");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Sever error..",
        icon: "error",
        confirmButtonColor: "#8fb569",
        confirmButtonText: "OK",
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <div>
        <section className="login-area pt-10 pb-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="basic-login">
                  <h3 className="text-center mb-60">
                    Update Procedure Details
                  </h3>
                  <form action="#">
                    <div class="row">
                      <div class="col-lg-8 offset-lg-2">
                        <div class="checkbox-form ">
                          <br></br>
                          <div class="row">
                            <div class="col-md-12"></div>

                            <div class="col-md-12">
                              <div class="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Procedure Name
                                    <span class="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={pname}
                                  onChange={(event) =>
                                    setProcedure_name(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    Doctor Name{" "}
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <select
                                  className="form-select select_style form-group"
                                  aria-label="Default select example"
                                  value={selectedDoctor}
                                  onChange={(event) =>
                                    setSelectedDoctor(event.target.value)
                                  }
                                >
                                  <option value={selectedDoctor.id}>
                                    {selectedDoctor.name}
                                  </option>
                                  {doctors.map((doc) => (
                                    <option key={doc.id} value={doc.id}>
                                      {doc.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    speciality <span class="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={speciality}
                                  onChange={(event) =>
                                    setspeciality(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            {/* <div class="col-md-6">
                              <div class="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    section <span class="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={section}
                                  onChange={(event) =>
                                    setsection(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div> */}
                            <div class="col-md-3">
                              <div class="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Price <span class="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={price}
                                  onChange={(event) =>
                                    setPrice(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Discount <span class="required"></span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={discount}
                                  onChange={(event) =>
                                    setDiscount(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="checkout-form-list duration-wrapper">
                                <label>
                                  <h5 className="theme-color">
                                    Duration <span className="required">*</span>
                                  </h5>
                                </label>
                                <div className="duration-input-group">
                                  <input
                                    type="text"
                                    placeholder=""
                                    value={duration}
                                    onChange={(event) =>
                                      setDuration(event.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="checkout-form-list">
                                <select
                                  required={true}
                                  className="form-select select_style form-group"
                                  id="insuranceProvider"
                                  onChange={handledurationtext}
                                  style={{ marginTop: "28px", height: "47px" }}
                                >
                                  <option value={durationtext}>
                                    {durationtext}
                                  </option>
                                  {durations.map((pro, index) => (
                                    <option key={index} value={pro}>
                                      {pro}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div class="order-notes">
                            <div class="checkout-form-list">
                              <label>
                                <h5 className="theme-color">
                                  Procedure Description
                                  <span class="required">*</span>
                                </h5>
                              </label>
                              <textarea
                                id="checkout-mess"
                                cols="30"
                                rows="10"
                                placeholder="Notes about your Procedure."
                                value={description}
                                onChange={(event) =>
                                  setDescription(event.target.value)
                                }
                                required
                              ></textarea>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="checkout-form-list mb-0">
                                <label>
                                  <h5 className="theme-color">
                                    Upload Image{" "}
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="file"
                                  name="photo"
                                  // value={photo}
                                  //  onChange={(e) => {
                                  //    setFile(e.target.files[0]);
                                  //  }}
                                  onChange={handleFileChange}
                                  style={{ padding: " 15px 20px" }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 mb-3 d-flex justify-content-center">
                              {imagePreview && (
                                <img
                                  src={imagePreview}
                                  alt="Procedure"
                                  style={{
                                    display: "block",
                                  }}
                                  className="doctor-image" // Add a class for targeting in CSS
                                />
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    Options of the procedure
                                  </h5>
                                </label>
                                {/* Mapping through the options state to display input boxes */}
                                {options.map((option, index) => (
                                  <div
                                    key={index}
                                    className="option-input-group d-flex"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Enter Option"
                                      value={option.option_name}
                                      onChange={(event) =>
                                        handleChangeOptionText(
                                          index,
                                          event.target.value
                                        )
                                      }
                                      required
                                      className="flex-grow-1 mr-2"
                                    />
                                    &nbsp;&nbsp;
                                    {/* {Prices.map((op) => ( */}
                                    <input
                                      type="text"
                                      placeholder="Enter Price"
                                      value={option.price}
                                      onChange={(event) =>
                                        handleChangeOptionPrice(
                                          index,
                                          event.target.value
                                        )
                                      }
                                      required
                                      className="flex-grow-1 mr-2"
                                    />
                                    &nbsp;&nbsp;
                                    {index > 0 && ( // Display the "Close" button only if it's not the first input box
                                      <button
                                        type="submit"
                                        onClick={() =>
                                          handleRemoveOption(index)
                                        }
                                        className="btn "
                                      >
                                        X
                                      </button>
                                    )}
                                  </div>
                                ))}
                                {/* Add button to add a new option */}
                              </div>
                              <div className="col-md-2">
                                <button
                                  type="submit"
                                  onClick={handleAddOption}
                                  className="primary_btn theme-btn"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-center">
                            <div class="order-button-payment md-3">
                              <button
                                type="submit"
                                onClick={handleProcedureRegistration}
                                class="primary_btn theme-btn"
                              >
                                Submit
                              </button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div class="order-button-payment md-3">
                              <a href="/ProviderLandingPage" id="cancelLink">
                                <button
                                  type="button"
                                  onClick={onCancel}
                                  class="primary_btn theme-btn"
                                >
                                  Cancel
                                </button>
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </form>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UpdateProcedureArea;
