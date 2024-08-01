import React, { useState , useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import CalanderModal from '../../CalanderModal/CalanderModal';




function BookDoctorsArea( selectedProcedure ,firstName) {
 // const location = useLocation();
  //console.log(location.state);
  console.log("to get procedure id",selectedProcedure)
 // console.log(data)
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [docId , setDocId] = useState('')

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [doctorImage, setDoctorImage] = useState('img/team/member-big.jpg');
  const [doctorName , setDoctorName] = useState ('');
  //const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  //const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
 // const [procedureName, setprocedureName] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [showBookDoctorsArea, setShowBookDoctorsArea] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [procedureName , setProcedureName] = useState()

  const handleDate = (doctorId) => {
    setShowModal(true); // Show the modal
    setSelectedDoctorId(doctorId); // Set the selected doctor's ID
    setDocId(doctorId);
    console.log("doc id >>>>",doctorId);
    console.log("doc id set >>>>",docId )
  };
  console.log("to get the selected procedure name >>>>",selectedProcedure)
  //const doc_id = provider.doctor_id;
const procedureId = selectedProcedure.selectedProcedure ;

console.log("pro id >>>>>",procedureId)


// get the procedure name 

  useEffect(() => {
 const fetchProcedureName = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/procedure/name/${procedureId}`);
        const procedureName = response.data.success;
        console.log('Fetched procedure name:', procedureName);

        setProcedureName(procedureName);
      //  setProvider(response.data.provider[0]);
      //   setDoctorImage(response.data.provider[0].image);
      //   setDoctorName(response.data.provider[0].doctorName);
      //   setDocId(response.data.provider[0].doctor_id);
           //setProcedureId
        
      } catch (error) {
        console.error('Error fetching procedures:', error);
      }
    };
  
    fetchProcedureName ();
  }, []);




//   useEffect(() => {
//  const fetchDoctorsData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8081/Procedure/providers/${procedureId}`);
//         console.log('Fetched provider data:', response.data);
      
//        setProvider(response.data.provider[0]);
//         setDoctorImage(response.data.provider[0].image);
//         setDoctorName(response.data.provider[0].doctorName);
//         setDocId(response.data.provider[0].doctor_id);
        
//       } catch (error) {
//         console.error('Error fetching procedures:', error);
//       }
//     };
  
//     fetchDoctorsData();
//   }, []);
console.log("setting procedure name",procedureName)
//const Name = procedureName;
//const Name = "Cardiac Catheterization";

useEffect(() => {
  const fetchProceduresData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/doctors/procedures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ procedureName }), // Send procedureName in the request body
      });

      if (response.ok) {
        const result = await response.json();
        console.log("list of doctors >>>>",result);
        setDoctors(result);
        // Update the state or perform any other necessary actions with the fetched data
      } else {
        console.log("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchProceduresData();
}, [procedureName]);




  
 // console.log(doctor.name)

  return (
    <div>
    {showModal ? (
      <CalanderModal style={{ maxWidth: '200px', margin: '0 auto' }} selectedProcedure={selectedProcedure} docId={docId} />
    ) : (
      <div className="service-widget mb-50" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="team-wrapper team-box-2 team-box-3 text-center mb-30">
            <div className="team-thumb">
              <img src={doctor.doctor_image} alt="" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>

            <div className="team-member-info mt-35 mb-35">
              <h5>
                <Link to="/doctorDetails">{doctor.doctor_name}</Link>
              </h5>
              <h6>
                <Link to="/doctorDetails">{doctor.name}</Link>
              </h6>

              <div className="col-md-12 text-center mt-30 form-group">
                <button type="submit" className="primary_btn btn-icon-green w-15" onClick={() => handleDate(doctor.doctor_id)}>
                  Select Date
                </button>
              </div>
              <h6 className="f-500 text-up-case letter-spacing pink-color">{doctor.specialty}</h6>
            </div>

            <div className="team-social-profile">
              <ul>
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-behance"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}

export default BookDoctorsArea;
