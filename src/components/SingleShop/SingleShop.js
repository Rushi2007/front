import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { Card } from "react-bootstrap";




const SingleShop = ({
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
  doctor_image
}) => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const patient_id = localStorage.getItem("patient_id");
  console.log("========>>>", id);
  const { result } = state;

  console.log("want procedure id >>>>>", result);

  const onMoreDetails = () => {
    console.log("description==>", description);
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
        doctor_image
      },
    });
  };
  const handleRedirect = (e) => {
    console.log("seleceted values", e.target.value);
    let data;

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

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <Card style={{ maxHeight: "100vh", marginBottom: "1rem" }}>
          <div className="product mb-3">
            <Card.Header style={{ height: "40vh", overflow: "hidden" }}>
              <div
                className="product__img"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              >
                {/* <Link to="/shopDetails"> */}
                <img
                  src={image}
                  alt=""
                  style={{ maxHeight: "100%", width: "100%" }}
                />
                {/* </Link> */}
              </div>
            </Card.Header>
            <Card.Body tyle={{ maxH: "60vh" }}>
              <div className="product__content text-center">
                <h4>
                  <span className="pro-cat">
                    <a>{speciality}</a>
                  </span>
                </h4>
                <h3 className="pro-title">{pname}</h3>
                <h4>
                  <div className="price">
                    <span>{price}</span>
                    <span className="old-price">₹ {discount}</span>
                  </div>
                </h4>
                <h5 className="pro-title">{provider_name}</h5>
                <h6 className="pro-title" style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={doctor_image}
                    alt={doctor_name}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }}
                  /> 
                  {doctor_name}
                </h6>
                <div className="product-action-text-center">
                  {patient_id !== null && (
                    <li>
                      <button
                        className="primary_btn btn-icon ml-0"
                        onClick={onMoreDetails}
                      >
                        <span>+</span> Book Procedure
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
                  {/* <button className="action-btn" onClick={onBookProcedure}>
                <i className="fas fa-plus"></i> Book Procedure
              </button> */}
                </div>
              </div>
            </Card.Body>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SingleShop;
