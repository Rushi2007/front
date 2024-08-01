import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useState } from "react";

const ContactFormArea = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onMessage = () => {
    if (!name || !email || !phone || !subject || !message) {
      Swal.fire({
        text: "All fields required!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        text: "We will get back to you soon!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  // Event handlers for updating state values
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <section className="contact-form-area gray-bg pt-100 pb-100">
        <div className="container">
          <div className="form-wrapper">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-8">
                <div className="section-title mb-55">
                  <p>
                    <span></span> Anything On your Mind
                  </p>
                  <h1>Estimate Your Idea</h1>
                </div>
              </div>
              {/* <div className="col-xl-4 col-lg-3 d-none d-xl-block ">
                        <div className="section-link mb-80 text-end">
                           <Link to="/appoinment"
                           className="primary_btn btn-icon ml-0"><span>+</span>Make
                              Appointment</Link>
                        </div>
                     </div> */}
            </div>
            <div className="contact-form">
              <form id="contact-form" action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-box user-icon mb-30">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box email-icon mb-30">
                      <input
                        type="text"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box phone-icon mb-30">
                      <input
                        required
                        type="text"
                        name="phone"
                        placeholder="Your Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-box subject-icon mb-30">
                      <input
                        required
                        type="text"
                        name="subject"
                        placeholder="Your Subject"
                        value={subject}
                        onChange={handleSubjectChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-box message-icon mb-30">
                      <textarea
                        required
                        name="message"
                        id="message"
                        cols="30"
                        rows="10"
                        placeholder="Your Message"
                        value={message}
                        onChange={handleMessageChange}
                      ></textarea>
                    </div>
                    <div className="contact-btn text-center">
                      <button
                        className="primary_btn btn-icon ml-0"
                        type="button"
                        onClick={onMessage}
                      >
                        <span>+</span> get action
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="ajax-response text-center"></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactFormArea;
