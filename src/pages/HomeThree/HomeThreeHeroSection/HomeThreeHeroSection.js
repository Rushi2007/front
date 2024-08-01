import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { RiAddBoxFill } from "react-icons/ri";

const HomeThreeHeroSection = () => {
  const navigate = useNavigate();
  const { setIsOpen } = useGlobalContext();
  const [freeProcedureSearch, setFreeProcedureSearch] = useState("");
  const [procedure, setProcedure] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [location, setLocation] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState("");
  const [speciality, setSpeciality] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [hospitalNames, setHospitalNames] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState([]);
  const [selectedHospital1, setSelectedHospital1] = useState([]);

  const patient_id = localStorage.getItem("patient_id");
  console.log("========>>>", patient_id);

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
    setSelectedSpeciality(
      e.target.value === "Choose A Specialty" ? "" : e.target.value
    );
  };

  const handleProcedureChange = (e) => {
    setSelectedProcedure(e.target.value);
    setSelectedProcedure(
      e.target.value === "Choose A Procedure" ? "" : e.target.value
    );
  };

  const handleLocationChange = (e) => {
    // setSelectedLocation(e.target.value);
    const selectedOption = e.target.value;
    const nameAndCity = selectedOption.split(", ");
    const name = nameAndCity[0];
    const city = nameAndCity[1];

    setSelectedName(name);
    setSelectedCity(city);
  };

  //1) useeffect code for spocialty - user selects specilty
  useEffect(() => {
    const getspeciality = async () => {
      await fetch("http://localhost:8081/Procedure/speciality", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("==>", result);
          setSpeciality(result.SpeialityName);
        })
        .catch((error) => {
          console.log("error found" + error);
        });
    };
    getspeciality();
  }, []);

  //2) useeffect code for procedure - user selects procedure
  useEffect(() => {
    if (selectedSpeciality) {
      const getprocedure = async () => {
        await fetch(
          `http://localhost:8081/Procedure/procedure/${selectedSpeciality}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("procedure1==>", result);
            setProcedure(result.proceduresName);
          })
          .catch((error) => {
            console.log("error found" + error);
          });
      };
      getprocedure();
    }
  }, [selectedSpeciality]);

  //3) useeffect code to fetch all hospitals based on speciality
  useEffect(() => {
    if (selectedSpeciality) {
      const getlocation = async () => {
        await fetch(
          `http://localhost:8081/Speciality/hospitals/${selectedSpeciality}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("city==>", result);
            setSelectedHospital1(result.cityName);
          })
          .catch((error) => {
            console.log("error found" + error);
          });
      };
      getlocation();
    }
    // else{
    //   getAllHospitals();
    // }
  }, [selectedSpeciality]);

  // to feetch hospitals based on selected procedure

  // to display all the hospitals

  const getAllHospitals = async () => {
    await fetch(`http://localhost:8081/Procedure/all/hospital/names`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("hospitals==>", result);
        setHospitalNames(result.pName);
      })
      .catch((error) => {
        console.log("error found" + error);
      });
  };

  useEffect(() => {
    getAllHospitals();
  }, []);

  // 4) submit handler - Book procedure code
  const onBookProcedure = async (e) => {
    e.preventDefault();

    const searchOption = {
      procedure: selectedProcedure,
      speciality: selectedSpeciality,
      selectedHospital: selectedHospital,
    };

    await fetch(
      "http://localhost:8081/Procedure/speciality/searchProcedurehome",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchOption),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          if (result.procedure.length === 0) {
            // No procedures found, display a message to the user
            Swal.fire({
              text: "No procedures found based on the provided criteria.",
              confirmButtonColor: "#8fb569",
              confirmButtonText: "OK",
            });
          } else {
            console.log("result-->>", result);
            // Procedures found, navigate to the shop page with the results
            navigate("/shop", { state: { result } });
          }
        } else {
          // Handle cases where the API request was not successful
          console.log("API request was not successful:", result.error);
          // Display a generic error message to the user
          Swal.fire({
            text: "No Procedure or Hospital found !",
            confirmButtonColor: "#8fb569",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        // Handle network errors or other unexpected errors
        console.log("Error:", error);
        // Display a generic error message to the user
        Swal.fire({
          text: "An error occurred while searching for procedures. Please try again later.",
          confirmButtonColor: "#8fb569",
          confirmButtonText: "OK",
        });
      });
  };

  // 5) submit handler - Book appointment code - get second opinion
  const onBookAppointment = async (e) => {
    e.preventDefault();

    // Check if all required fields are selected
    if (!selectedSpeciality || !selectedProcedure) {
      // Show a message or display a popup indicating that all fields are required
      Swal.fire({
        text: "Please select all fields before Booking an Appointment",
        confirmButtonColor: "#8fb569",
        confirmButtonText: "OK",
      });

      return;
    }

    const appointmentOption = {
      procedure: selectedProcedure,
      selectedName: selectedName,
      selectedCity: selectedCity,
      speciality: selectedSpeciality,
    };

    console.log(appointmentOption);

    // await fetch(
    //   "http://localhost:8081/Procedure/speciality/searchProcedurehome",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(appointmentOption),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    if (!selectedSpeciality) {
      // No selected procedure, do not navigate
      return;
    }

    if (patient_id) {
      // Patient ID exists, navigate to patient landing page

      navigate("/BookAppointment", { state: { appointmentOption } });
    } else {
      // Patient ID does not exist, navigate to register page
      navigate("/login");
    }
    // })
    // .catch((error) => {
    //   console.log("error found" + error);
    // });
  };

  // Free Search Bar code
  const onChangefreeProcedureSearch = (e) => {
    setFreeProcedureSearch(e.target.value);
  };

  // 6) submit handler - Free Search Bar API
  const onSearch = async (e) => {
    e.preventDefault();
    const search = {
      procedure: freeProcedureSearch,
    };

    await fetch("http://localhost:8081/Procedure/freeSearchProcedurehome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("===>result", result);
        navigate("/shop", { state: { result } });
      })
      .catch((error) => {
        console.log("error found" + error);
      });
  };

  const handleHospitalChange = async (e) => {
    console.log("selected hospital--->>", e.target.value);
    setSelectedHospital(e.target.value);
  };

  console.log("selected hospital-->>", selectedHospital);
  return (
    <>
      <VideoPopup videoId="oU_GUAWz52w" />

      <section className="hero-area">
        <div className="hero-slider">
          <div className="slider-active">
            <div
              className="single-slider home_three slider-height slider-height-3 d-flex align-items-center"
              data-background="img/slider/slider-bg-3.jpg"
            >
              <div className="container">
                <div
                  className="row align-items-center"
                  style={{ marginTop: "-200px" }}
                >
                  <div className="col-xl-6 col-lg-6 col-md-10">
                    <div className="hero-text hero-text-2 pt-35">
                      <div className="hero-slider-caption hero-slider-caption-2">
                        <h5 style={{ marginTop: "60px" }}>
                          We are here for your care.
                        </h5>
                        <h1>Best Care & Better Hospital.</h1>
                      </div>
                      {/* // Free Search Bar form*/}
                      <div>
                        <form onSubmit={onSearch}>
                          <div class="p-1 bg-light p-3 rounded rounded-pill shadow-sm mb-4">
                            <div class="input-group">
                              <input
                                onChange={onChangefreeProcedureSearch}
                                value={freeProcedureSearch}
                                type="search"
                                placeholder="Search Procedures.."
                                aria-describedby="button-addon1"
                                class="form-control border-0 bg-light p-3 rounded rounded-pill"
                                required
                                style={{ fontWeight: "600" }}
                              />
                              <div class="input-group-append">
                                <button
                                  id="button-addon1"
                                  type="submit"
                                  class="btn btn-link text-primary btn btn-lg"
                                >
                                  <i class="fa fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* Register Button */}
                      <div className="hero-slider-btn">
                        {patient_id === null && (
                          <Link
                            to="/register"
                            className="primary_btn btn-icon ml-0"
                          >
                            <span>+</span>Register Here
                          </Link>
                        )}
                        <button
                          onClick={() => setIsOpen(true)}
                          className="play-btn popup-video"
                        >
                          <i className="fas fa-play"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Search by Options */}
                  <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-12">
                    <div className="slider-right-2">
                      <div className="caregive-box">
                        <div className="search-form">
                          {/* <span className="sub-heading">
                            We are here for you
                          </span> */}
                          <h3>Find A Care Giver</h3>
                        </div>

                        <div className="row">
                          <div className="col-xl-12">
                            <div className="row appoinment-form-box appoinment-form-box-option d-flex mb-40">
                              {/* <div className="row"> */}
                              <div className="col-lg-3">
                                <div className="appoint-ment-icon">
                                  <img
                                    src="img/icon/choose-icon-0.jpg"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <form
                                  onSubmit={onBookProcedure}
                                  className="appointment-form-2"
                                  action="#"
                                >
                                  {/* <label htmlFor="speciality">
                                  select Specialty
                                </label> */}

                                  <select
                                    name="speciality"
                                    id="speciality"
                                    className="postform"
                                    value={selectedSpeciality} // Updated variable name
                                    onChange={handleSpecialityChange}
                                    required
                                  >
                                    <option value="Choose A Specialty">
                                      Choose A Specialty
                                    </option>
                                    {speciality.map((getspecial, index) => (
                                      <option
                                        key={index}
                                        value={getspecial.speciality}
                                      >
                                        {getspecial.speciality}
                                      </option>
                                    ))}
                                  </select>
                                </form>
                              </div>
                              {/* </div> */}
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="row appoinment-form-box appoinment-form-box-option d-flex mb-40">
                              <div className="col-lg-3">
                                <div className="appoint-ment-icon">
                                  <img
                                    src="img/icon/choose-icon-0.jpg"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <form className="appointment-form-2" action="#">
                                  {/* <label htmlFor="procedure">
                                  select your procedure
                                </label> */}
                                  <select
                                    name="procedure"
                                    id="procedure"
                                    className="postform"
                                    value={selectedProcedure} // Updated variable name
                                    onChange={handleProcedureChange}
                                    required
                                  >
                                    <option value="Choose A Procedure">
                                      Choose A Procedure
                                    </option>
                                    {procedure.map((getpro, index) => (
                                      <option key={index} value={getpro.pname}>
                                        {getpro.pname}
                                      </option>
                                    ))}
                                  </select>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="row appoinment-form-box appoinment-form-box-option d-flex mb-40">
                              <div className="col-lg-3">
                                <div
                                  className="appoint-ment-icon"
                                  // style={{ fontSize: "30px", color: "pink" }}
                                >
                                  <img
                                    src="img/icon/choose-icon-0.jpg"
                                    alt=""
                                  />
                                  {/* <RiAddBoxFill /> */}
                                </div>
                              </div>
                              {/* <form className="appointment-form-2" action="#">
                                
                                <select
                                  name="location"
                                  id="location"
                                  className="postform"
                                  onChange={handleLocationChange}
                                  required
                                >
                                  <option value="Choose A Location">
                                    Choose A Location
                                  </option>
                                  {hospitalNames.map((getloc, index) => (
                                    <option key={index}>
                                      {getloc.name}
                                    </option>
                                  ))}
                                </select>
                              </form> */}
                              <div className="col-lg-9">
                                {selectedSpeciality ? (
                                  <form
                                    className="appointment-form-2"
                                    action="#"
                                  >
                                    {/* <label htmlFor="location">
                                  select your location
                                </label> */}
                                    <select
                                      name="location"
                                      id="location"
                                      className="postform"
                                      onChange={handleHospitalChange}
                                      required
                                    >
                                      <option value="Choose A Location">
                                        Choose A Hospital
                                      </option>

                                      {selectedHospital1.map((loc, index) => (
                                        <option key={index}>
                                          {loc.name}{" "}
                                          {/* Assuming locationData is the property holding location data */}
                                        </option>
                                      ))}
                                    </select>
                                  </form>
                                ) : (
                                  <div>
                                    <form
                                      className="appointment-form-2"
                                      action="#"
                                    >
                                      {/* <label htmlFor="location">
  select your location
</label> */}
                                      <select
                                        name="location"
                                        id="location"
                                        className="postform"
                                        onChange={handleHospitalChange}
                                        required
                                      >
                                        <option value="Choose A Location">
                                          Choose A Hospital
                                        </option>
                                        {hospitalNames.map((loc, index) => (
                                          <option key={index}>
                                            {loc.name}{" "}
                                            {/* Assuming locationData is the property holding location data */}
                                          </option>
                                        ))}
                                      </select>
                                    </form>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 mb-35">
                            <div className="inner caregive-btn text-center">
                              <button
                                className="primary_btn btn-icon ml-0"
                                onClick={onBookProcedure}
                                required
                              >
                                <span>+</span>
                                Search Procedure
                              </button>
                            </div>
                            &nbsp;
                            <div className="inner caregive-btn text-center">
                              <button
                                className="primary_btn btn-icon ml-0"
                                onClick={onBookAppointment}
                              >
                                <span>+</span>
                                Get second Opinion
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeThreeHeroSection;
