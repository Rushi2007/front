import React from "react";

const ContactArea = () => {
  return (
    <>
      <section
        className="contact-area pt-120 pb-90"
        data-background="assets/img/bg/bg-map.png"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="contact text-center mb-30">
                <i className="fas fa-envelope"></i>
                <h3>Mail Here</h3>
                {/* <p>Admin@TreatSmart.com</p> */}
                <p>info@TreatSmart.in</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="contact text-center mb-30">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Visit Here</h3>
                <p>TreatSmart Center, Bavdhan, Pune, Maharashtra, India</p>
              </div>
            </div>
            <div className="col-xl-4  col-lg-4 col-md-4 ">
              <div className="contact text-center mb-30">
                <i className="fas fa-phone"></i>
                <h3>Call Here</h3>
                {/* <p>+91 020 985 789</p> */}
                <p>+91 7499893791</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
