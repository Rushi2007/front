import React, { useState } from "react";
import ConsultationHistory from "../../ConsultationHistory/ConsultationHistory";
import BookingHistoryArea from "./BookingHistoryArea";
import PatientArea from "../../PatientLandingPage/PatientLandingPageArea/PatientLandingPageArea";

function BookingHistory() {
  const [showBookingHistoryArea, setShowBookingHistoryArea] = useState(false);
  const [showConsultationHistory, setShowConsultationHistory] = useState(true);

  const handleBookingHistoryArea = () => {
    setShowBookingHistoryArea(true);
    setShowConsultationHistory(false);
  };

  const handleConsultationHistory = () => {
    setShowConsultationHistory(true);
    setShowBookingHistoryArea(false);
  };

  return (
    <div>
      <div className="col py-3">
        <section className="login-area pt-50 pb-80">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ backgroundColor: "#223645" }}>
                <br />
                <PatientArea />
              </div>
              <div className="col-lg-9 justify-content-center">
                <div className="containersign">
                  <div className="flex-column flex-sm-row">

                  <button
                      className={showConsultationHistory ? "tabs active-tabs" : "tabs"}
                      onClick={handleConsultationHistory}
                    >
                      Consultation History
                    </button>
                    <button
                      className={showBookingHistoryArea ? "tabs active-tabs" : "tabs"}
                      onClick={handleBookingHistoryArea}
                    >
                      Booking History
                    </button>
                   
                  </div>
                </div>

                {showBookingHistoryArea && <BookingHistoryArea />}
                {showConsultationHistory && <ConsultationHistory />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BookingHistory;
