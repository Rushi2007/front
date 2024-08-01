import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookDoctorsArea from "../BookDoctors/BookDoctorsArea/BookDoctorsArea";
import PatientLandingPage from "../PatientLandingPage/PatientLandingPageArea/PatientLandingPageArea";
import { useLocation } from "react-router-dom";

const BookAppointment = ({ data }) => {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [procedureName, setprocedureName] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [showBookDoctorsArea, setShowBookDoctorsArea] = useState(false);
  const [procedureNamee , setProcedureNamee] = useState('')
  const navigate = useNavigate();
  const location = useLocation()

  const frontData =  location.state?.appointmentOption;
  console.log("front end booking data",frontData)


  useEffect(() => {
    if (frontData) {
      setProcedureNamee(frontData.procedure);
    }
  }, [frontData]);
 // console.log("check the name of pro >>", frontProName)


 useEffect(() => {
  const fetchProceduresData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ procedureNamee }), // Send procedureName in the request body
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Fetched procedure:", result[0].id);
        setSelectedProcedure(result[0].id)
        // Update the state or perform any other necessary actions with the fetched data
      } else {
        console.log("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchProceduresData();
}, [procedureNamee]);

  

 

  const patientId = localStorage.getItem("patient_id");

  useEffect(() => {
    if (data) {
      //setprocedureName(data.appointmentOption.procedure)
    }
  }, [data]);



  
  
  //console.log(data);
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/patients/${patientId}`
        );
        const { firstname, phone } = response.data;
        setFirstName(firstname);
        setPhone(phone);
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);


  useEffect(() => {
    const fetchProcedureData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/Procedure/procedures/patient"
        );
        setprocedureName(response.data.procedureName);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      }
    };

    fetchProcedureData();
  }, []);


 

  const handleProcedureChange = async (procedureId) => {
    setSelectedProcedure(procedureId);

    try {
      const response = await axios.get(
        `http://localhost:8081/Procedure/providers/${procedureId}`
      );
      console.log("Fetched providers:", response.data.provider);
      setSelectedProvider("");
      setProviders(response.data.provider);
      console.log("p==>", providers);
      // setDoctors([]);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const handleProviderChange = async (providerId) => {
    setSelectedProvider(providerId);
    setSelectedProviderId(providerId);

    try {
      console.log(providerId);
      const response = await axios.get(
        `http://localhost:8081/doctors/${providerId}`
      );
      console.log("Fetched doctors:", response.data.doctors);
      // setDoctors(response.data.doctors);
      //console.log(setDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to submit the appointment
      // You can uncomment and modify this code according to your API endpoint

      // const response = await axios.post('http://localhost:8081/api/appointments', {
      //   procedureId: selectedProcedure,
      //   providerId: selectedProvider,
      //   patientName: firstName,
      //   phoneNumber: phone,
      // });

      // console.log('Appointment submitted successfully:', response.data);
      // Show a success message or navigate to a success page
      // navigate("/bookdoctors" ,{state : [{ procedure: selectedProcedure},{ name: firstName} , {provider: selectedProvider}, {providerId : selectedProviderId}]})

      if(selectedProcedure){
        setShowBookDoctorsArea(true);
      }
      
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  //const data = [selectedProcedure, selectedProvider ,selectedProviderId ,firstName]

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
                  <PatientLandingPage />
                </div>
                <div>
                  <section className="col-lg-9">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="basic-login">
                            <h2 className="text-center mb-60">Book Appointment</h2>
                            <br></br>
                            {/* <div
                              style={{
                                flex: 1,
                                marginLeft: "20px",
                                padding: "0 20px",
                                marginTop: "20px",
                              }}
                            > */}
                            {showBookDoctorsArea ? (
                              <BookDoctorsArea
                                selectedProcedure={selectedProcedure}
                                firstName={firstName}
                                provider={selectedProvider}
                                providerId={selectedProviderId}
                              />
                            ) : (
                              <div
                                style={{
                                  flex: 1,
                                  marginLeft: "20px",
                                  padding: "0 20px",
                                  marginTop: "20px",
                                }}
                              >
                                <form style={{ marginBottom: "20px" }}>
                                  <div className="mb-2">
                                    <label htmlFor="procedure" className="mb-2">
                                      <h5 className="theme-color">
                                        Procedure<span>*</span>
                                      </h5>
                                    </label>
                                    <select
                                      required
                                      id="procedure"
                                      className="form-select select_style"
                                      value={selectedProcedure}
                                      onChange={(e) => handleProcedureChange(e.target.value)}
                                    >
                                      <option value="">Select Procedure</option>
                                      {procedureName.map((procedure) => (
                                        <option key={procedure.id} value={procedure.id}>
                                          {procedure.pname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-2">
                                    <label htmlFor="provider" className="mb-2">
                                      <h5 className="theme-color">
                                       Hospital Name<span></span>
                                      </h5>
                                    </label>
                                    <select
                                      required
                                      id="provider"
                                      className="form-select select_style"
                                      value={selectedProvider}
                                      onChange={(e) => handleProviderChange(e.target.value)}
                                    >
                                      <option value="">Select Hospital</option>
                                      {providers.map((provider) => (
                                        <option key={provider.id} value={provider.id}>
                                          {provider.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  {/* <div className="mb-2">
                                    <label htmlFor="name" className="mb-2">
                                      <h5 className="theme-color">
                                        Patient Name<span>*</span>
                                      </h5>
                                    </label>
                                    <input
                                      required
                                      type="text"
                                      placeholder="Enter Name..."
                                      value={firstName}
                                      onChange={(e) => setFirstName(e.target.value)}
                                    />
                                  </div>
                                  <div className="mb-2">
                                    <label htmlFor="phone" className="mb-2">
                                      <h5 className="theme-color">
                                        Phone Number<span>*</span>
                                      </h5>
                                    </label>
                                    <input
                                      required
                                      type="tel"
                                      placeholder="Enter Mobile number..."
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                    />
                                  </div> */}

                                  <div className="col-md-12 text-center mt-40 form-group">
                                    <button
                                      type="submit"
                                      className="primary_btn btn-icon-green w-50"
                                      onClick={submitForm}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>

                              </div>
                            )}

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

export default BookAppointment;
