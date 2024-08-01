import React from "react";
import { Link } from "react-router-dom";

const DoctorDetailsArea = () => {
  return (
    <>
      <div className="doctor-details-area pt-115 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8">
              <article className="doctor-details-box">
                <div className="section-title pos-rel mb-25">
                  <div className="section-icon">
                    <img
                      className="section-back-icon back-icon-left"
                      src="img/section/section-back-icon-sky.png"
                      alt=""
                    />
                  </div>
                  <div className="section-text pos-rel">
                    <h5 className="green-color text-up-case">
                      introducing my self
                    </h5>
                    <h3>
                      Dr. Halim D. Keliano: Bridging Dental and Neurological
                      Expertise for Comprehensive Care.
                    </h3>
                  </div>
                  <div className="section-line pos-rel">
                    <img src="img/shape/section-title-line.png" alt="" />
                  </div>
                </div>
                <div className="service-details-text mb-40">
                  <p>
                    Dr. Halim D. Keliano is a highly skilled professional who
                    excels in two specialized fields: Dentistry and Neurology.
                    With an impressive background and extensive expertise in
                    both disciplines, Dr. Keliano has established himself as a
                    distinguished Dentist and Neurologist, dedicated to
                    providing exceptional care and improving the well-being of
                    his patients. In the realm of dentistry, Dr. Keliano
                    possesses a deep understanding of oral health and its impact
                    on overall wellness. With precision and compassion, he
                    performs a wide range of dental procedures, from routine
                    check-ups and cleanings to complex restorative treatments
                    and cosmetic enhancements. His attention to detail and
                    commitment to staying abreast of the latest advancements in
                    dental technology enable him to deliver outstanding results,
                    leaving his patients with beautiful, healthy smiles.
                  </p>
                </div>
                <div className="section-title pos-rel mb-25">
                  <div className="section-text pos-rel">
                    <h1>Here Is Skills</h1>
                  </div>
                  <div className="section-line pos-rel">
                    <img src="img/shape/section-title-line.png" alt="" />
                  </div>
                </div>
                <div className="service-details-text mb-35">
                  <p>
                    Dr. Halim D. Keliano possesses a diverse set of skills that
                    contribute to their expertise in dentistry and neurology.Dr.
                    Halim D. Keliano's broad skill set allows them to provide
                    comprehensive care to their patients, addressing both dental
                    and neurological concerns with expertise and compassion.
                  </p>
                </div>
                <div className="service-details-feature fix mb-30">
                  <div className="ser-fea-box f-left">
                    <div className="ser-fea-icon f-left">
                      <img src="img/services/ser-fea-icon-1.png" alt="" />
                    </div>
                    <div className="ser-fea-list fix">
                      <h3>Personal care</h3>
                      <ul>
                        <li>
                          <i className="fas fa-check"></i>Patient-Centered
                          Approach.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Compassion and
                          Empathy.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Tailored Treatment
                          Plans.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Clear Communication.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="ser-fea-box f-left me-0">
                    <div className="ser-fea-icon f-left">
                      <img src="img/services/ser-fea-icon-2.png" alt="" />
                    </div>
                    <div className="ser-fea-list fix">
                      <h3>Lifestyle support</h3>
                      <ul>
                        <li>
                          <i className="fas fa-check"></i>Oral Hygiene
                          Education.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Nutritional Guidance.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Smoking Cessation.
                        </li>
                        <li>
                          <i className="fas fa-check"></i>Stress Management
                          Techniques.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="section-title pos-rel mb-25">
                  <div className="section-text pos-rel">
                    <h1>Care Coverage</h1>
                  </div>
                  <div className="section-line pos-rel">
                    <img src="img/shape/section-title-line.png" alt="" />
                  </div>
                </div>
                <div className="service-details-text mb-30">
                  <p>
                    Dr. Halim D. Keliano's care coverage area typically refers
                    to the geographical region or location where they provide
                    their dental and neurological services. The specific care
                    coverage area may vary depending on Dr. Keliano's practice
                    or clinic.
                  </p>
                </div>
                <div id="contact-map" className="service-map mb-55">
                  <div style={{ width: "100%" }}>
                    <iframe
                      title="Contact"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58403.623581008454!2d90.32726121307132!3d23.81054442359749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c1c61277db%3A0xc7d18838730e2e59!2z4Kau4Ka_4Kaw4Kaq4KeB4KawLCDgpqLgpr7gppXgpr4!5e0!3m2!1sbn!2sbd!4v1643621605621!5m2!1sbn!2sbd"
                      style={{ width: "100%" }}
                      height={400}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-xl-5 col-lg-4">
              <div className="service-widget mb-50">
                <div className="team-wrapper team-box-2 team-box-3 text-center mb-30">
                  <div className="team-thumb">
                    <img src="img/team/member-big.jpg" alt="" />
                  </div>
                  <div className="team-member-info mt-35 mb-35">
                    <h3>
                      <Link to="/doctorDetails">Halim D. Keliano</Link>
                    </h3>
                    <h6 className="f-500 text-up-case letter-spacing pink-color">
                      Dentist & Neurologist
                    </h6>
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
              </div>
              <div className="service-widget mb-50">
                <div className="widget-title-box mb-30">
                  <h3 className="widget-title">Qualifications</h3>
                </div>
                <div className="more-service-list">
                  <ul>
                    <li>
                      <Link to="/doctorDetails">
                        <div className="more-service-icon">
                          <img src="img/services/more-ser-1.png" alt="" />
                        </div>
                        <div className="more-service-title doctor-details-title">
                          Master of Science{" "}
                          <span>Oxford Univercity (2011 - 2014)</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/doctorDetails">
                        <div className="more-service-icon">
                          <img src="img/services/more-ser-5.png" alt="" />
                        </div>
                        <div className="more-service-title doctor-details-title">
                          Neurology Test{" "}
                          <span>Stanford Versity (2015 - 2021)</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="service-widget mb-80">
                <div className="widget-title-box mb-30">
                  <h3 className="widget-title">Get Some Advice?</h3>
                </div>
                <form className="service-contact-form" action="">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="contact-input contact-icon contact-user mb-20">
                        <input type="text" placeholder="Enter your name" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="contact-input contact-icon contact-mail mb-20">
                        <input type="text" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="contact-input contact-icon contact-hourglass">
                        <select
                          className="form-select select_style"
                          aria-label="Default select example"
                        >
                          <option defaultValue="Select type of care">
                            Select type of care
                          </option>
                          <option defaultValue="1">Select type of care</option>
                          <option defaultValue="2">Select type of care</option>
                          <option defaultValue="2">Select type of care</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="ser-form-btn text-center mt-40">
                  <a
                    href="#"
                    className="primary_btn btn-icon ml-0"
                    style={{ animationDelay: "0.6s" }}
                    tabIndex="0"
                  >
                    <span>+</span>Request for call
                  </a>
                </div>
              </div>
              <div className="service-widget mb-50">
                <div className="widget-title-box mb-30">
                  <h3 className="widget-title">Languages</h3>
                </div>
                <div className="doctor-detials-lan">
                  <ul>
                    <li>
                      <a href="#">en</a>
                    </li>
                    <li>
                      <a href="#">es</a>
                    </li>
                    <li>
                      <a href="#">bd</a>
                    </li>
                    <li>
                      <a href="#">la</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetailsArea;
