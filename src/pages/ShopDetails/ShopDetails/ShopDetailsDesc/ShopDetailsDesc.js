import React, { useState, useEffect } from "react";
import ProcedureReviews from "../../../AddReviewForm/Displayreview/ProcedureReviews";
import Chatbot from "../../../../components/Chatbot/Chatbot"; // Import the Chatbot component
import DisplayOptions from "../../../AddNewProcedure/DisplayOptions";

const ShopDetailsDesc = (data) => {
  // const {description } = description;
  console.log("data.description", data);
  console.log("<><><><</></></>", data);

  const [procedureOne, setProcedureOne] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
    setSelectedImage('');
  };

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        if (data.doctor_id) {
          const response = await fetch(
            `http://localhost:8081/provider/doctor/search/${data.doctor_id}`
          );
          const result = await response.json();
          console.log("API response:", result); // Log the full response
          if (result && result.doctor) {
            setProcedureOne(result.doctor);
          } else {
            console.error("Doctor data not found in the response", result);
          }
        } else {
          setProcedureOne([]);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchProcedure();
  }, [data.doctor_id]);

  useEffect(() => {
    console.log("Updated doctor details:", procedureOne);
    if (procedureOne.length > 0) {
      console.log("doctor name inside:", procedureOne[0].name);
    }
  }, [procedureOne]); // Listen to changes in procedureOne

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  const renderBio = (bio) => {
    const MAX_LENGTH = 200; // The maximum number of characters to show by default
    if (bio.length <= MAX_LENGTH) {
      return bio;
    }
    if (showFullBio) {
      return (
        <>
          {bio}{" "}
          <span className="read-more" onClick={toggleBio}>
            Read Less
          </span>
        </>
      );
    }
    return (
      <>
        {bio.substring(0, MAX_LENGTH)}...{" "}
        <span className="read-more" onClick={toggleBio}>
          Read More
        </span>
      </>
    );
  };

  // if (procedureOne.length === 0) {
  //   console.log("No doctor details available.");
  // } else {
  //   console.log("doctor details outside:", procedureOne);
  //   console.log("doctor name outside:", procedureOne[0].name);
  // }

  return (
    <>
      <section className="product-desc-area pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bakix-details-tab">
                <ul
                  className="nav text-center justify-content-center pb-30 mb-50"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="desc-tab"
                      data-bs-toggle="tab"
                      href="#id-desc"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Description{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-add-in"
                      data-bs-toggle="tab"
                      href="#id-add"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Hospital Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-add-doctor"
                      data-bs-toggle="tab"
                      href="#id-doctor"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Doctor Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-r"
                      data-bs-toggle="tab"
                      href="#id-rev"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="id-desc"
                  role="tabpanel"
                  aria-labelledby="desc-tab"
                >
                  <div className="event-text mb-40">
                    <p>{data.description}</p>
                  </div>
                  <Chatbot pname={data.pname} />
                  {/* Render the Chatbot component */}
                </div>

                <div
                  className="tab-pane fade"
                  id="id-add"
                  role="tabpanel"
                  aria-labelledby="id-add-in"
                >
                  <div className="additional-info">
                    <div className="table-responsive">
                      <h4>Hospital information</h4>
                      <table className="table">
                        <tbody>
                          <tr>{/* display image here */}</tr>
                          <tr>
                            <th>Hospital Name</th>
                            <td className="product_weight">
                              {/* <img
                                src={procedureOne.doctor_image}
                                alt=""
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '40%',
                                  marginRight: '10px'
                                }}
                              /> */}
                              {data.provider_name}
                            </td>
                          </tr>
                          <tr>
                            <th>Hospital Phone Number</th>
                            <td className="product_dimensions">{data.phone}</td>
                          </tr>
                          <tr>
                            <th>Hospital Address</th>
                            <td className="product_dimensions">
                              {[
                                data.address,
                                ", ",
                                data.city,
                                ", ",
                                data.country,
                              ]}
                            </td>
                          </tr>
                          <tr>
                            <th>Doctor Name</th>
                            <td className="product_dimensions">
                              {data.doctor_name}
                            </td>
                          </tr>
                          <tr>
                            <th>Tieup with Insurance Companies</th>
                            <td className="product_dimensions">{data.phone}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="id-doctor"
                  role="tabpanel"
                  aria-labelledby="id-add-doctor"
                >
                  <div className="additional-info">
                    <div className="table-responsive">
                      <h4>Doctor information</h4>
                      <table className="table">
                        <tbody>
                          {procedureOne.length > 0 && procedureOne[0] && (
                            <>
                              <tr>{/* display image here */}</tr>
                              <tr>
                                <th>Doctor Name</th>
                                <td className="product_weight">
                                  <img
                                    src={procedureOne[0].doctor_image}
                                    alt=""
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      // borderRadius: '10%',
                                      // border: '2px solid grey',
                                      marginRight: '10px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => handleImageClick(procedureOne[0].doctor_image)}
                                  />
                                  {procedureOne[0].name}
                                </td>
                              </tr>
                              <tr>
                                <th>Phone Number</th>
                                <td className="product_dimensions">
                                  {procedureOne[0].phone}
                                </td>
                              </tr>
                              <tr>
                                <th>Email</th>
                                <td className="product_dimensions">
                                  {procedureOne[0].email}
                                </td>
                              </tr>
                              <tr>
                                <th>Speciality</th>
                                <td className="product_dimensions">
                                  {procedureOne[0].specialty}
                                </td>
                              </tr>
                              <tr>
                                <th>Bio</th>
                                <td className="product_dimensions">
                                  {/* {procedureOne[0].bio} */}
                                  {renderBio(procedureOne[0].bio)}
                                </td>
                              </tr>
                            </>
                          )}
                          {procedureOne.length === 0 && (
                            <tr>
                              <td colSpan="2">
                                No doctor information available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      {isImageOpen && (
                        <div
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                          }}
                          onClick={closeImage}
                        >
                          <div
                            style={{
                              position: 'relative',
                              backgroundColor: 'white',
                              padding: '20px',
                              borderRadius: '8px',
                              textAlign: 'center',
                            }}
                          >
                            {/* <button
                              style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'red',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={closeImage}
                            >
                              X
                            </button> */}
                            <img src={selectedImage} alt="Doctor" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="id-rev"
                  role="tabpanel"
                  aria-labelledby="id-r"
                >
                  <div className="additional-info">
                    <div className="event-text mb-40">
                      <ProcedureReviews procedureId={data.procedureId} />
                    </div>
                  </div>
                </div>
                {/* <div
                  className="tab-pane fade"
                  id="id-Option"
                  role="tabpanel"
                  aria-labelledby="id-r"
                >
                  <div className="additional-info">
                    <div className="event-text mb-40">
                      <DisplayOptions procedureId={data.procedureId} />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailsDesc;
