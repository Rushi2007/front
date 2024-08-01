import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Doctor.css";

const UpadateDoctorArea = ({ doctor }) => {
  const [dname, setUsername] = useState("");
  const [pId, setPId] = useState("");
  const [id, setdoctor_id] = useState("");
  const [name, setDoctor_name] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [specialty, setspecialty] = useState("");
  const [created_at, setcreated_at] = useState("");
  const [bio, setbio] = useState("");
  const [updated_at, setupdated_at] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      setPId(storedPId);
      console.log("provider id", storedPId);
    }
    if (doctor) {
      setdoctor_id(doctor.id);
      setDoctor_name(doctor.name);
      setemail(doctor.email);
      setphone(doctor.phone);
      setspecialty(doctor.specialty);
      setcreated_at(doctor.created_at);
      setbio(doctor.bio);
      setupdated_at(doctor);
      setFile(doctor.doctor_image);
      setImagePreview(doctor.doctor_image);
    }
  }, [doctor]);

  const handleDoctorRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("specialty", specialty);
    formData.append("updated_at", updated_at);
    formData.append("created_at", created_at);
    formData.append("phonephone", phone);
    formData.append("pId", pId);

    try {
      const response = await axios.put(
        `http://localhost:8081/doctordetails/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const data = response.data;

      if (response.ok) {
        Swal.fire({
          title: "Error!",
          text: "Failed to update doctor details..",
          icon: "error",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
        navigate("/DoctorProfileArea");
        resetForm();
      } else {
        Swal.fire({
          title: "success!",
          text: "Updated doctor details..",
          icon: "success",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
        });
        navigate("/DoctorProfileArea");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Server error..",
        icon: "error",
        confirmButtonColor: "8fb569",
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

  const resetForm = () => {
    setDoctor_name("");
    setemail("");
    setphone("");
    setspecialty("");
    setcreated_at("");
    setbio("");
    setupdated_at("");
    setFile(null);
  };

  return (
    <div>
      <section className="login-area pt-10 pb-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="basic-login">
                <h3 className="text-center mb-60">Update Doctor Details</h3>
                <form>
                  <div className="mb-2">
                    <label htmlFor="name" className="mb-2">
                      <h5 className="theme-color">
                        Doctor Name<span>*</span>
                      </h5>
                    </label>
                    <input
                      required
                      id="name"
                      type="text"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={(event) => setDoctor_name(event.target.value)}
                    />
                  </div>

                  <label htmlFor="email-id" className="mb-2">
                    <h5 className="theme-color">
                      Doctor Email Address <span>*</span>
                    </h5>
                  </label>
                  <input
                    required
                    id="email-id"
                    type="email"
                    value={email}
                    placeholder="Enter Email address..."
                    onChange={(event) => setemail(event.target.value)}
                  />

                  <div className="mb-2">
                    <label htmlFor="phone" className="mb-2">
                      <h5 className="theme-color">
                        Doctor Contact number <span></span>
                      </h5>
                    </label>
                    <input
                      required
                      id="phone"
                      type="tel"
                      value={phone}
                      placeholder="Enter Mobile number..."
                      onChange={(event) => setphone(event.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="address" className="mb-2">
                      <h5 className="theme-color">
                        {" "}
                        Speciality <span>*</span>
                      </h5>
                    </label>
                    <input
                      required
                      id="address"
                      type="text"
                      value={specialty}
                      placeholder="Enter Speciality..."
                      onChange={(event) => setspecialty(event.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          <h5 className="theme-color">
                            {" "}
                            Doctor Image <span className="required">*</span>
                          </h5>
                        </label>
                        <input
                          type="file"
                          name="photo"
                          // onChange={(e) => {
                          //   setFile(e.target.files[0]);
                          // }}
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
                          alt="Doctor"
                          style={{
                            display: "block",
                          }}
                          className="doctor-image" // Add a class for targeting in CSS
                        />
                      )}
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <div class="order-button-payment md-3">
                      <button
                        type="submit"
                        onClick={handleDoctorRegistration}
                        class="primary_btn theme-btn"
                      >
                        Submit
                      </button>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="order-button-payment md-3">
                      <a href="/DoctorProfileArea" id="cancelLink">
                        <button type="button" class="primary_btn theme-btn">
                          Cancel
                        </button>
                      </a>
                    </div>
                  </div>
                </form>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpadateDoctorArea;
