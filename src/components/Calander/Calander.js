import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
//import { useNavigate } from "react-router-dom";
//import Swal from 'sweetalert2';
//import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Calendar({ selectedProcedure, doctorId }) {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [data, setData] = useState(selectedProcedure);
  const price = 500;
  const navigate = useNavigate();
  // const [docId , setDocId] = useState(docId)

  console.log("the passed data >>>", data);

  async function onPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:8081/consultationpayment", {
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price * 100,
        patient_id: localStorage.getItem("patient_id"),
      }),
    });

    console.log(data);

    const options = {
      key: "rzp_test_LerHhmnSru6RuL",
      amount: price * 100,
      currency: "INR",
      order_id: data.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        navigate("/bookhistory");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  //const [doc , setDoc] = useState()
  // console.log(data.doctorId);
  // console.log(data.selectedProcedure.firstName)
  // console.log(data.selectedProcedure.providerId);
  // console.log(data.selectedProcedure.selectedProcedure)
  const patientId = localStorage.getItem("patient_id");
  const docId = selectedProcedure.docId;
  console.log("last >>", docId);

  console.log(" new booked events >>>>", bookedEvents);

  useEffect(() => {
    // Fetch already booked appointments from the API to show on calender pop up
    fetchBookedAppointments();
  }, [docId]);

  const fetchBookedAppointments = async () => {
    try {
      console.log(">>>>>>>", docId);
      const response = await axios.get(
        `http://localhost:8081/consultation/booked/${docId}`
      );
      const consultations = response.data.consultations;
      console.log("new consultation >>", consultations);

      const formattedEvents = consultations.map((consultation) => ({
        title: `Booked ${consultation.consultation_time}`,
        date: new Date(consultation.consultation_date),
        extendedProps: {
          time: consultation.consultation_time,
          // consultationId: consultation.consult_id,
          // notes: consultation.consultation_notes,
          // prescription: consultation.prescription,
          // followupDate: new Date(consultation.followup_date),
          // procedureId: consultation.procedure_id,
          // patientId: consultation.patient_id,
          doctorId: consultation.doctor_id,
        },
      }));

      setBookedEvents(formattedEvents);
      console.log(" new booked events >>>>", bookedEvents);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.dateStr);

    // Check if the clicked date is in the past
    if (clickedDate < new Date()) {
      return; // Do nothing and exit the function
    }

    Swal.fire({
      title: "Select Time",
      html: `
      <select id="time" class="swal2-input" required>
        <option value="">Select Time</option>
        <option value="09:00 AM">09:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 AM">12:00 AM</option>
        <option value="01:00 PM">01:00 PM</option>
        <option value="02:00 PM">02:00 PM</option>
      </select>`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Book",
      preConfirm: () => {
        const time = document.getElementById("time").value;
        // Save the selected date and time to the database
        if (!time) {
          Swal.showValidationMessage("Please select a time");
          return false;
        }
        saveToDatabase(clickedDate, time);
      },
    });
  };

  const saveToDatabase = async (date, time) => {
    const formattedTime = time.substring(0, 5);

    //if(time !== consultation.consultation_date)

    try {
      const response = await axios.post(
        "http://localhost:8081/api/patients/consultation",
        {
          consultation_date: date,
          consultation_time: formattedTime,
          selectedProcedure: selectedProcedure,
          doctor_id: docId,
          procedure_id: data.selectedProcedure.selectedProcedure,
          patient_id: patientId,
        }
      );
      // console.log("want doctor id", selectedProcedure)
      //alert("please check booking history")

      console.log(response.data);

      if (response.data) {
        Swal.fire({
          title: "Success!",
          text: "Appointment Booked Successfully !!",
          icon: "success",
          confirmButtonColor: "8fb569",
          confirmButtonText: "Pay Now",
          showCancelButton: true,
          cancelButtonText: "PayLater",
        }).then((result) => {
          if (result.isConfirmed) {
            // Do something if "OK" is clicked
            onPay();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // "Pay Now" button is clicked
            // Swal.fire({
            //   title: "success ",
            //   text: "Appointment Canceled successfully !!",
            //   icon: "success",
            //   confirmButtonColor: "8fb569",
            //   confirmButtonText: "ok",
            //   // showCancelButton: true,
            //   // cancelButtonText: "Cancel",
            // });

            navigate('/bookhistory' , {state:{result:result}})
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Select Date And Time Correctly ",
          icon: "error",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
      }

      const newEvent = {
        title: `Booked ${formattedTime}`,
        date: date,
        time: time,
      };

      setBookedEvents([...bookedEvents, newEvent]);
      console.log(newEvent);
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleEventClick = (arg) => {
    const { event } = arg;
    Swal.fire({
      title: "Manage Booking",
      html: `
        <p>Date: ${event.start.toISOString().split("T")[0]}</p>
        <p>Time: ${event.extendedProps.time}</p>
       `,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // updateBooking(event);
      }
    });
  };

  const eventRender = (info) => {
    const { event } = info;
    if (event.title.startsWith("Booking on")) {
      info.el.style.backgroundColor = "green"; // Change the background color of booked events
    }
  };

  const dayCellContent = (arg) => {
    const { dayNumberText, date } = arg;
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const cellDate = date.setHours(0, 0, 0, 0);

    const isPastDate = cellDate < currentDate;
    const isBooked = bookedEvents.some((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      return eventDate === cellDate;
    });

    const dateBoxStyle = {
      backgroundColor: isBooked
        ? "green"
        : isPastDate
        ? "lightgray"
        : "transparent",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: isPastDate ? "not-allowed" : "pointer",
    };

    const handleClick = () => {
      if (!isPastDate) {
        handleDateClick(arg);
      }
    };

    return (
      <div style={dateBoxStyle} onClick={handleClick}>
        <span>{dayNumberText}</span>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        events={bookedEvents}
        eventClick={handleEventClick}
        eventRender={eventRender}
        dayCellContent={dayCellContent}
        validRange={(nowDate) => {
          return {
            start: "2000-01-01", // Set a past date that you want to be visible
            end: nowDate.end, // Set the end date as the current date
          };
        }}
      />
    </div>
  );
}

export default Calendar;
