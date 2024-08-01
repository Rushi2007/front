import React, { useState, useEffect } from "react";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ManageProcedure from "../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure";

const ProviderGallery = () => {
  const [procedureImages, setProcedureImages] = useState([]);
  const [doctorImages, setDoctorImages] = useState([]);
  const [providerImage, setProviderImage] = useState("");
  const [active, setActive] = useState("all");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false); // Define the open state variable

  useEffect(() => {
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      console.log("provider id", storedPId);
      fetchData(storedPId);
    }
  }, []);

  const fetchData = async (providerId) => {
    try {
      const procedureResponse = await axios.get(
        `http://localhost:8081/procedure-images/${providerId}`
      );
      console.log("procedure response", procedureResponse.data); // Check the response object
      setProcedureImages(procedureResponse.data.images);

      const doctorResponse = await axios.get(
        `http://localhost:8081/doctor-images/${providerId}`
      );
      console.log("doctor response", doctorResponse.data); // Check the response object
      setDoctorImages(doctorResponse.data.images);

      const providerResponse = await axios.get(
        `http://localhost:8081/provider-image/${providerId}`
      );
      console.log("provider response", providerResponse.data); // Check the response object
      setProviderImage(providerResponse.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const filterItems = (category) => {
    setActive(category);
  };

  const getFilteredItems = () => {
    if (active === "all") {
      return [...providerImage, ...doctorImages, ...procedureImages];
    } else if (active === "Provider") {
      return providerImage;
    } else if (active === "Doctors") {
      return doctorImages;
    } else if (active === "Procedure") {
      return procedureImages;
    }

    return [];
  };

  const filterGalleryItems = getFilteredItems();

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
                <div className="col-lg-9  justify-content-center mx-5">
                  <section className="portfolio-area pt-20 pb-90 ">
                    <div className="container">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center">
                            <div className="portfolio-filter mb-40">
                              <button
                                className={active === "all" ? "active" : null}
                                onClick={() => filterItems("all")}
                              >
                                Show all
                              </button>
                              <button
                                className={
                                  active === "Provider" ? "active" : null
                                }
                                onClick={() => filterItems("Provider")}
                              >
                                Provider
                              </button>
                              <button
                                className={
                                  active === "Doctors" ? "active" : null
                                }
                                onClick={() => filterItems("Doctors")}
                              >
                                Doctors
                              </button>
                              <button
                                className={
                                  active === "Procedure" ? "active" : null
                                }
                                onClick={() => filterItems("Procedure")}
                              >
                                Procedure
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {filterGalleryItems.length > 0 && (
                        <div id="portfolio-grid" className="row row-portfolio">
                          {filterGalleryItems.map((item, index) => (
                            <div
                              className="col-lg-4 col-md-6 grid-item"
                              key={index}
                            >
                              <div className="portfolio-item mb-30">
                                <div className="portfolio-wrapper">
                                  <div className="portfolio-image">
                                    <img
                                      src={item.image}
                                      alt=""
                                      height="300px"
                                      width="300px"
                                      style={{ objectFit: "cover" }}
                                    />
                                    <div
                                      className="view-icon"
                                      onClick={() => setOpen(true)}
                                    >
                                      <button className="popup-image">
                                        <i className="fas fa-plus"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="portfolio-caption">
                                    <h4>{item.name}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {open && (
                        <Lightbox
                          mainSrc={filterGalleryItems[photoIndex]?.image}
                          nextSrc={
                            filterGalleryItems[
                              (photoIndex + 1) % filterGalleryItems.length
                            ]?.image
                          }
                          prevSrc={
                            filterGalleryItems[
                              (photoIndex + filterGalleryItems.length - 1) %
                                filterGalleryItems.length
                            ]?.image
                          }
                          onCloseRequest={() => setOpen(false)}
                          onMovePrevRequest={() =>
                            setPhotoIndex(
                              (photoIndex + filterGalleryItems.length - 1) %
                                filterGalleryItems.length
                            )
                          }
                          onMoveNextRequest={() =>
                            setPhotoIndex(
                              (photoIndex + 1) % filterGalleryItems.length
                            )
                          }
                        />
                      )}
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

export default ProviderGallery;
