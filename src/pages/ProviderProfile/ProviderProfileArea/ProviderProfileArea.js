import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ManageProcedure from "../../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure";
import "../../DoctorProfile/DoctorProfileArea/Doctor.css";

const ProviderProfileArea = () => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [Speciality, setSpeciality] = useState("");
  //   const [Medical_Info, setMedical_Info] = useState('');
  const [Zip, setZip] = useState("");
  const [file, setFile] = useState("");
  //   const [Password, setPassword] = useState('');
  const [Website, setWebsite] = useState("");
  const [Phone, setPhone] = useState("");
  const [hospitalName, setHospitalName] = useState();
  const navigate = useNavigate();
  // const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setName(storedUsername);
    }
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      axios
        .get(`http://localhost:8081/providerprofile/${storedPId}`)
        .then((response) => {
          console.log("provider details-->>", response.data.provider);
          console.log("Address=>", response.data.provider[0].address);
          const providerData = response.data.provider[0];
          // setName(providerData.name);
          console.log(providerData.address);
          setAddress(providerData.address);
          setEmail(providerData.email);
          setCity(providerData.city);
          setState(providerData.state);
          setCountry(providerData.country);
          setSpeciality(providerData.speciality);
          setZip(providerData.zipcode);
          setWebsite(providerData.website);
          setPhone(providerData.phone);
          setHospitalName(providerData.name);
          setFile(providerData.provider_image);
          setImagePreview(providerData.provider_image);
          // const imageUrl= providerData.provider_image
          // setImage(providerData.provider_image);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      // const updatedProviderData = {

      //   name: Name,
      //   address: Address,
      //   email: Email,
      //   city: City,
      //   state: State,
      //   country: Country,
      //   speciality: Speciality,
      //   zipcode: Zip,
      //   website: Website,
      //   phone: Phone,
      // };
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("name", Name);
      formData.append("address", Address);
      formData.append("email", Email);
      formData.append("city", City);
      formData.append("state", State);
      formData.append("country", Country);
      formData.append("speciality", Speciality);
      formData.append("zipcode", Zip);
      formData.append("website", Website);
      formData.append("phone", Phone);

      axios
        .put(`http://localhost:8081/providerprofile/${storedPId}`, formData)
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "success!",
            text: "Updated Provider Details..",
            icon: "success",
            confirmButtonColor: "#8fb569",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to Updated Provider Details..",
            icon: "error",
            confirmButtonColor: "#8fb569",
            confirmButtonText: "OK",
          });

          // Handle error
        });
      // setErrorModalOpen(true);
    }
  };
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);

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
                  <div className="basic-login">
                    <h2 className="text-center mb-60">Hospital Profile</h2>
                    <form>
                      <div className="mb-2">
                        <label htmlFor="name" className="mb-2">
                          <h5 className="theme-color">
                            Hospital Name<span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="name"
                          type="text"
                          placeholder="Enter Name..."
                          value={hospitalName || Name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <label htmlFor="email-id" className="mb-2">
                        <h5 className="theme-color">
                          {" "}
                          Hospital Email Address <span>*</span>
                        </h5>
                      </label>
                      <input
                        required
                        id="email-id"
                        type="email"
                        placeholder="Enter Email address..."
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div className="mb-2">
                        <label htmlFor="phone" className="mb-2">
                          <h5 className="theme-color">
                            {" "}
                            Hospital Contact number <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="phone"
                          type="tel"
                          placeholder="Enter Mobile number..."
                          value={Phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="address" className="mb-2">
                          <h5 className="theme-color">
                            Hospital Address <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="address"
                          type="text"
                          placeholder="Enter Address..."
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <label htmlFor="city" className="mb-2">
                            <h5 className="theme-color">
                              {" "}
                              City <span>*</span>
                            </h5>
                          </label>
                          <input
                            required
                            id="city"
                            type="text"
                            value={City}
                            placeholder="Enter City..."
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>

                        <div className="col-md-6 mb-2">
                          <label htmlFor="state" className="mb-2">
                            <h5 className="theme-color">
                              State <span>*</span>
                            </h5>
                          </label>
                          <input
                            required
                            id="state"
                            type="text"
                            value={State}
                            placeholder="Enter State..."
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="country" className="mb-2">
                          <h5 className="theme-color">
                            Country <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="country"
                          type="text"
                          value={Country}
                          placeholder="Enter country..."
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="zip" className="mb-2">
                          <h5 className="theme-color">
                            {" "}
                            Post Code <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="zip"
                          type="text"
                          value={Zip}
                          placeholder="Enter Zip Code..."
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="speciality" className="mb-2">
                          <h5 className="theme-color">
                            Specialty <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="speciality"
                          type="text"
                          value={Speciality}
                          placeholder="Enter Speciality..."
                          onChange={(e) => setSpeciality(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="url" className="mb-2">
                          <h5 className="theme-color">
                            Website <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="Enter Website"
                          value={Website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              <h5 className="theme-color">
                                Upload Image <span className="required">*</span>
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
                              alt="Procedure"
                              style={{
                                display: "block",
                              }}
                              className="doctor-image" // Add a class for targeting in CSS
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 text-center mt-40 form-group">
                        <button
                          type="submit"
                          className="primary_btn btn-icon-green w-50"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProviderProfileArea;
{
  /* <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="basic-login">
                <h3 className="text-center mb-60">Profile Page</h3>
                <form>
                  <div className="mb-2">
                    <label htmlFor="name" className="mb-2">
                      Hospital Name<span>*</span>
                    </label>
                    <input
                      required
                      id="name"
                      type="text"
                      placeholder="Enter Name..."
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <label htmlFor="email-id" className="mb-2">
                    Hospital Email Address <span>*</span>
                  </label>
                  <input
                    required
                    id="email-id"
                    type="email"
                    placeholder="Enter Email address..."
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="mb-2">
                    <label htmlFor="phone" className="mb-2">
                      Hospital Contact number <span>*</span>
                    </label>
                    <input
                      required
                      id="phone"
                      type="tel"
                      placeholder="Enter Mobile number..."
                      value={Phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="address" className="mb-2">
                      Hospital Address <span>*</span>
                    </label>
                    <input
                      required
                      id="address"
                      type="text"
                      placeholder="Enter Address..."
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="city" className="mb-2">
                        City <span>*</span>
                      </label>
                      <input
                        required
                        id="city"
                        type="text"
                        value={City}
                        placeholder="Enter City..."
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="state" className="mb-2">
                        State <span>*</span>
                      </label>
                      <input
                        required
                        id="state"
                        type="text"
                        value={State}
                        placeholder="Enter State..."
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="country" className="mb-2">
                      Country <span>*</span>
                    </label>
                    <input
                      required
                      id="country"
                      type="text"
                      value={Country}
                      placeholder="Enter country..."
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="zip" className="mb-2">
                      Post Code <span>*</span>
                    </label>
                    <input
                      required
                      id="zip"
                      type="text"
                      value={Zip}
                      placeholder="Enter Zip Code..."
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="speciality" className="mb-2">
                      Specialty <span>*</span>
                    </label>
                    <input
                      required
                      id="speciality"
                      type="text"
                      value={Speciality}
                      placeholder="Enter Speciality..."
                      onChange={(e) => setSpeciality(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="url" className="mb-2">
                      Website <span>*</span>
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="Enter Website"
                      value={Website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Upload Image <span className="required">*</span>
                        </label>
                        <input
                          type="file"
                          name="photo"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ser-form-btn text-center mt-40 form-group">
                    <a
                      href="#"
                      onClick={handleSubmit}
                      className="primary_btn btn-icon ml-0"
                      style={{ animationDelay: "0.6s" }}
                      tabIndex="0"
                    >
                      <span>+</span>Submit Changes
                    </a>
                  </div>
                </form>
                <br></br>
              </div>
            </div>
          </div>
        </div> */
}
