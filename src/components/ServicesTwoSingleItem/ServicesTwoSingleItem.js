import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

const ServicesTwoSingleItem = (bookingData) => {
  const navigate = useNavigate();
  const status = "complete";

  console.log("p2==>", bookingData.bookingData);
  const handleReviewClick = () => {
    navigate("/Review", {
      state: {
        patientId: bookingData.bookingData.patient_id,
        procedureId: bookingData.bookingData.procedure_id,
      },
    });
  };
  let price = bookingData.bookingData.price;

  async function onPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:8081/procedurebookingpayment", {
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
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        onProcedureUpdate("complete", bookingData.bookingData.id);
        navigate("/bookhistory");
        window.location.reload();
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const onProcedureUpdate = (status, bookingId) => {
    console.log("the status and id ----->", status, bookingId);
    axios
      .put(`http://localhost:8081/api/patients/booking/update/${bookingId}`, {
        status,
      })
      .then((response) => {
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        console.error("Error booking procedure:", error);
      });
  };

  if (bookingData.bookingData.status === "complete") {
    return (
      <div className="col-xl-4 col-lg-4 col-md-6" >
        <div className="service-box-3 mb-30 text-center">
          <div className="service-thumb">
            <Link>
              <img
                width="100"
                src={bookingData.bookingData.procedure_image}
                alt=""
              />
            </Link>
          </div>
          <div className="service-content-box">
            <div className="service-content">
              <h3>
                <Link>{bookingData.bookingData.pname}</Link>
              </h3>
              <p>Status: {bookingData.bookingData.status}</p>
            </div>
            <div onClick={handleReviewClick} className="service-link">
              <Link>Review</Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-xl-4 col-lg-4 col-md-6">
        <div className="service-box-3 mb-30 text-center">
          <div className="service-thumb">
            <Link>
              <img
                width="100"
                src={bookingData.bookingData.procedure_image}
                alt=""
              />
            </Link>
          </div>
          <div className="service-content-box">
            <div className="service-content">
              <h3>
                <Link>{bookingData.bookingData.pname}</Link>
              </h3>
              {/* <p>{bookingData.bookingData.description}</p> */}
              <p>Price: {bookingData.bookingData.price}</p>
              <p>Status: {bookingData.bookingData.status}</p>
            </div>
            <div onClick={onPay} className="service-link">
              <Link>Pay Now</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ServicesTwoSingleItem;
