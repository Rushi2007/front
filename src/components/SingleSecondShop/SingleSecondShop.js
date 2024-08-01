import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";

const SingleSecondShop = ({
  id,
  image,
  speciality,
  pname,
  price,
  discount,
  description,
  provider_name,
  address,
  city,
  country,
  phone,
  doctor_name,
  doctor_id,
}) => {
  const Navigate = useNavigate();

  const { state } = useLocation();
  const patient_id = localStorage.getItem("patient_id");
  console.log("========>>>", patient_id);
  const { result } = state;

  const handleRedirect = () => {
    Navigate("/login", {
      state: {
        data: {
          result: true,
          id,
          image,
          speciality,
          pname,
          price,
          discount,
          description,
        },
      },
    });
  };

  const onMoreDetails = () => {
    Navigate("/shopDetails", {
      state: {
        id,
        image,
        speciality,
        pname,
        price,
        discount,
        description,
        provider_name,
        address,
        city,
        country,
        phone,
        doctor_name,
        doctor_id,
      },
    });
  };

  const onBookProcedure = () => {
    // Make an API request to save the data to the backend
    axios
      .post("http://localhost:8081/api/patients/booking", {
        image,
        speciality,
        pname,
        price,
        discount,
        provider_name,
        patient_id,
        procedure_id: id,
      })
      .then((response) => {
        // Handle the successful response
        console.log("Booking successful:", response.data);
        Navigate("/patientlandingpage");
        // Optionally, you can navigate to a success page or display a success message
      })
      .catch((error) => {
        // Handle the error
        console.error("Error booking procedure:", error);
        // Optionally, you can display an error message to the user
      });
  };

  return (
    <>
      <Card style={{ marginBottom: "1rem" }}>
        <Card.Header>
          {/* <div className="col-lg-4 col-md-6"> */}
          <div className="product mb-3">
            <div className="product__img">
              {/* <Link to="/shopDetails"> */}
              <img src={image} alt="" />
              {/* </Link> */}
            </div>
          </div>
          {/* </div> */}
        </Card.Header>

        {/* <div className="col-lg-8"> */}
        {/* <div className="product-list-content pt-10 mb-30"> */}
        <Card.Body>
          <div className="product__content mb-3">
            <h4>
              <span className="pro-cat">
                <a>{speciality}</a>
              </span>
            </h4>
            <h3 className="pro-title">{pname}</h3>
            <h4>
              <div className="price">
                <span>₹ {price}</span>
                <span className="old-price">₹ {discount}</span>
              </div>
            </h4>
            <h5 className="pro-title">{provider_name}</h5>
            {/* display a small image here as in same line with doctor name */}
            <h6 className="pro-title">{doctor_name}</h6>
          </div>
          <p>{description}</p>

          <div className="product-action-list">
            {patient_id !== null && (
              <li>
                <button
                  className="primary_btn btn-icon ml-0"
                  onClick={onMoreDetails}
                >
                  <span>+</span>Book Procedure
                </button>
              </li>
            )}
            {patient_id === null && (
              <li>
                <button
                  className="primary_btn btn-icon ml-0"
                  onClick={handleRedirect}
                >
                  <span>+</span> Book Procedure
                </button>
              </li>
            )}

            <button
              className="action-btn"
              onClick={onMoreDetails}
              style={{ backgroundColor: "#e7e7e7", color: "black" }}
            >
              <i className="fas fa-expand"></i> More Details
            </button>
          </div>
        </Card.Body>
        {/* </div> */}
        {/* </div> */}
      </Card>
    </>
  );
};

export default SingleSecondShop;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Card } from "react-bootstrap";

// const SingleSecondShop = ({
//   id,
//   image,
//   speciality,
//   pname,
//   price,
//   discount,
//   description,
//   provider_name,
//   address,
//   city,
//   country,
//   phone,
//   doctor_name,
// }) => {
//   const Navigate = useNavigate();

//   const { state } = useLocation();
//   const patient_id = localStorage.getItem("patient_id");
//   console.log("========>>>", patient_id);
//   const { result } = state;

//   const handleRedirect = () => {
//     Navigate("/login", {
//       state: {
//         data: {
//           result: true,
//           id,
//           image,
//           speciality,
//           pname,
//           price,
//           discount,
//           description,
//         },
//       },
//     });
//   };

//   const onMoreDetails = () => {
//     Navigate("/shopDetails", {
//       state: {
//         id,
//         image,
//         speciality,
//         pname,
//         price,
//         discount,
//         description,
//         provider_name,
//         address,
//         city,
//         country,
//         phone,
//         doctor_name,
//       },
//     });
//   };

//   const onBookProcedure = () => {
//     // Make an API request to save the data to the backend
//     axios
//       .post("http://localhost:8081/api/patients/booking", {
//         image,
//         speciality,
//         pname,
//         price,
//         discount,
//         provider_name,
//         patient_id,
//         procedure_id: id,
//       })
//       .then((response) => {
//         // Handle the successful response
//         console.log("Booking successful:", response.data);
//         Navigate("/patientlandingpage");
//         // Optionally, you can navigate to a success page or display a success message
//       })
//       .catch((error) => {
//         // Handle the error
//         console.error("Error booking procedure:", error);
//         // Optionally, you can display an error message to the user
//       });
//   };

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <div className="col-lg-4 col-md-6">
//             <div className="product mb-30">
//               <div className="product__img">
//                 {/* <Link to="/shopDetails"> */}
//                 <img src={image} alt="" />
//                 {/* </Link> */}
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-8">
//             <div className="product-list-content pt-10 mb-30">
//               <div className="product__content mb-20">
//                 <h4>
//                   <span className="pro-cat">
//                     <a>{speciality}</a>
//                   </span>
//                 </h4>
//                 <h3 className="pro-title">{pname}</h3>
//                 <h4>
//                   <div className="price">
//                     <span>₹ {price}</span>
//                     <span className="old-price">₹ {discount}</span>
//                   </div>
//                 </h4>
//                 <h5 className="pro-title">{provider_name}</h5>
//               </div>
//               <p>{description}</p>
//               <div className="product-action-list">
//                 {patient_id !== null && (
//                   <li>
//                     <button
//                       className="primary_btn btn-icon ml-0"
//                       onClick={onMoreDetails}
//                     >
//                       <span>+</span>Book Procedure
//                     </button>
//                   </li>
//                 )}
//                 {patient_id === null && (
//                   <li>
//                     <button
//                       className="primary_btn btn-icon ml-0"
//                       onClick={handleRedirect}
//                     >
//                       <span>+</span> Book Procedure
//                     </button>
//                   </li>
//                 )}

//                 <button
//                   className="action-btn"
//                   onClick={onMoreDetails}
//                   style={{ backgroundColor: "#e7e7e7", color: "black" }}
//                 >
//                   <i className="fas fa-expand"></i> More Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>
//     </>
//   );
// };

// export default SingleSecondShop;
