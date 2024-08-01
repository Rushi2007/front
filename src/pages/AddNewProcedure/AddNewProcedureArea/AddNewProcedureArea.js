import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "../../DoctorProfile/DoctorProfileArea/Doctor.css";

import "sweetalert2/src/sweetalert2.scss";

const durations = ["Month", "Days", "Hours"];

const AddNewProcedureArea = () => {
  const [pname, setProcedureName] = useState("");
  const [description, setDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  // const [providerId, setProviderId] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const storedProviderId = localStorage.getItem("provider_id");
  const [durationtext, setdurationtext] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setFile(selectedFile);
  // };

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
    // if (storedProviderId) {
    //   setProviderId(storedProviderId);
    // }

    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleProcedureRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("pname", pname);
    formData.append("description", description);
    formData.append("doctor_id", selectedDoctor);
    formData.append("duration", duration);
    formData.append("durationtext", durationtext);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("provider_id", storedProviderId);
    formData.append("speciality", speciality);
    // formData.append("section", section);
    // formData.append("options", options);
    // formData.append("Prices", Prices);

    // Append options data to FormData
    options.forEach((option, index) => {
      formData.append(`options[${index}][option_text]`, option.text);
      formData.append(`options[${index}][option_price]`, option.price);
    });
    try {
      const response = await axios.post(
        "http://localhost:8081/Procedure/adddataImages",
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
          text: "Procedure Added..",
          icon: "success",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
        });

        navigate("/ProviderLandingPage");
        resetForm();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Check the procedure image and details..",
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
        text: "Insert the correct data.",
        icon: "error",
        confirmButtonColor: "#8fb569",
        confirmButtonText: "OK",
      });
    }
  };

  // Event handler for insurance provider dropdown
  const handledurationtext = (e) => {
    const selectedProvider = e.target.value;
    setdurationtext(selectedProvider);
  };
  const handlesetselecteddoctorlistChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Doctor:", selectedValue);
    setSelectedDoctor(selectedValue);
  };

  const resetForm = () => {
    setProcedureName("");
    setPrice("");
    setDescription("");
    // setDoctors([]);
    setDuration("");
    setDiscount("");
    setSpeciality("");
    setSection("");
    setFile(null);
  };

  return (
    <>
      <div>
        <section className="login-area pt-10 pb-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Add Procedure Details</h3>
                  <form action="#" onSubmit={handleProcedureRegistration}>
                    <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                        <div className="checkbox-form">
                          <br></br>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Procedure Name
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={pname}
                                  onChange={(event) =>
                                    setProcedureName(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Doctor Name{" "}
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <select
                                  className="form-select select_style form-group"
                                  onChange={handlesetselecteddoctorlistChange}
                                  aria-label="Default select example"
                                >
                                  <option
                                    defaultValue="Select Procedure"
                                    value={selectedDoctor}
                                  >
                                    Select Doctors
                                  </option>
                                  {doctors.map((doc) => (
                                    <option key={doc.doctor_id} value={doc.id}>
                                      {doc.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    Speciality{" "}
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={speciality}
                                  onChange={(event) =>
                                    setSpeciality(event.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            {/* <div className="col-md-6">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">Section <span className="required">*</span></h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={section}
                                  onChange={(event) => setSection(event.target.value)}
                                  required
                                />
                              </div>
                            </div> */}
                            <div className="col-md-3">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    {" "}
                                    Price (₹)<span className="required">*</span>
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
                            <div className="col-md-3">
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    Discount (₹)
                                    {/* <span className="required"></span> */}
                                  </h5>
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  value={discount}
                                  onChange={(event) =>
                                    setDiscount(event.target.value)
                                  }
                                  // required
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
                                  <option value="">Select</option>
                                  {durations.map((pro, index) => (
                                    <option key={index} value={pro}>
                                      {pro}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="order-notes">
                            <div className="checkout-form-list">
                              <label>
                                <h5 className="theme-color">
                                  Procedure Description
                                  <span className="required">*</span>
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
                              <div className="checkout-form-list">
                                <label>
                                  <h5 className="theme-color">
                                    Upload Image{" "}
                                    <span className="required">*</span>
                                  </h5>
                                </label>
                                <input
                                  type="file"
                                  name="file"
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
                                      value={option.text}
                                      onChange={(event) =>
                                        handleChangeOptionText(
                                          index,
                                          event.target.value
                                        )
                                      }
                                      // required
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
                                      // required
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
                          &nbsp; &nbsp;
                          <div className="d-flex justify-content-center">
                            <div className="order-button-payment md-3">
                              <button
                                type="submit"
                                className="primary_btn theme-btn"
                              >
                                Submit
                              </button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="order-button-payment md-3">
                              <button
                                type="reset"
                                onClick={resetForm}
                                className="primary_btn theme-btn"
                              >
                                Reset
                              </button>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="order-button-payment md-3">
                              <a href="/ProviderLandingPage" id="cancelLink">
                                <button
                                  type="button"
                                  className="primary_btn theme-btn"
                                >
                                  Cancel
                                </button>
                              </a>
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

export default AddNewProcedureArea;
