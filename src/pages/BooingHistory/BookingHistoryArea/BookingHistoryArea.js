import React, { useState, useEffect } from "react";
import ServicesTwoSingleItem from "../../../components/ServicesTwoSingleItem/ServicesTwoSingleItem";

function BookingHistoryArea() {
  const [bookingData, setBookingData] = useState([]);
  const patientId = localStorage.getItem("patient_id");
  console.log("p1===>", bookingData);
  useEffect(() => {
    // Fetch booking data here
    const fetchBookingData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/patient/${patientId}`
        );
        const data = await response.json();
        console.log("booking data >>>>", data[0].status);
        setBookingData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingData();
  }, []);
  console.log("dsasd", bookingData);
  return (
    <div style={{ marginLeft: "40px" }}>
      <br></br>
      <br></br>
      <div className="booking-history-container">
        {/* <h2 style={{ textAlign: "center",marginBottom: "35px" }}>Booking History</h2> */}
      </div>
      {bookingData.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {bookingData.map((booking) => (
            <ServicesTwoSingleItem bookingData={booking} />
          ))}
        </div>
      ) : (
        <p className="no-booking-history" style={{ textAlign: "center" }}>
          No booking history found.
        </p>
      )}

      {/* <ConsultationHistory /> */}
    </div>
  );
}

export default BookingHistoryArea;
