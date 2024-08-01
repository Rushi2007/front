import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ProcedureOptions from "../../../../components/ProcedureOptions/ProcedureOptions";
import ProcedureAccomodation from "../../../../components/ProcedureAccomodation/ProcedureAccomodation";

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

const ShopDetailsBanner = ({ data }) => {
  const [optionPrice, setOptionPrice] = useState("");
  const [selectedAccomodationPrice, setSelectedAccomodationPrice] =
    useState("");

  let location = useLocation();
  console.log("after login data ", location.state);

  console.log("comming data and procedure name", data);

  let dataAfterLogin = location.state.procedureData;

  const calculateTotalPrice = () => {
    let totalPrice = parseFloat(price);
    if (optionPrice) totalPrice += parseFloat(optionPrice);
    if (selectedAccomodationPrice)
      totalPrice += parseFloat(selectedAccomodationPrice);
    return totalPrice;
  };
  let {
    id,
    image,
    speciality,
    pname,
    price,
    discount,
    provider_name,
    description,
  } = dataAfterLogin ? dataAfterLogin : data;
  console.log("==>", data);
  //const statuss = "complete";
  //const status = JSON.stringify(statuss);
  // const status = statuss
  const navigate = useNavigate();
  localStorage.setItem("procedure_id", id);
  const patient_id = localStorage.getItem("patient_id");
  console.log("========>>>", patient_id);
  const Navigate = useNavigate();
  const handleRedirect = () => {
    Navigate("/login", {
      state: {
        data,
      },
    });
  };

  const alertMessage = () => {
    if (!dataAfterLogin || !data) {
      console.log("message , no procedures found");
    }
  };

  useEffect(() => {
    alertMessage();
  }, []);

  async function onPay() {
    const totalPrice = calculateTotalPrice();
    //Navigate("/shopDetails");
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
        amount: totalPrice * 100,
        patient_id: localStorage.getItem("patient_id"),
      }),
    });

    console.log(data);

    const options = {
      key: "rzp_test_LerHhmnSru6RuL",
      amount: totalPrice * 100,
      currency: "INR",
      order_id: data.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id)
        // alert(response.razorpay_order_id)
        // alert(response.razorpay_signature)
        alert("please check booking history !!!");
        // let status = "complete";
        onBookProcedure("complete");
        navigate("/bookhistory");
        window.location.reload();
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const onBookProcedure = (status) => {
    const totalPrice = calculateTotalPrice();

    // Make an API request to save the data to the backend
    axios
      .post("http://localhost:8081/api/patients/booking", {
        image,
        speciality,
        pname,
        price: totalPrice,
        discount,
        patient_id,
        procedure_id: id,
        status,
        //status : status
      })

      .then((response) => {
        // Handle the successful response
        console.log("Booking successful:", response.data);
        Navigate("/bookhistory", response);
        // Navigate("/bookhistory");

        // Optionally, you can navigate to a success page or display a success message
      })
      .catch((error) => {
        // Handle the error
        console.error("Error booking procedure:", error);
        // Optionally, you can display an error message to the user
      });
  };

  return (
    <>
      <section className="shop-banner-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-7">
              {/* <div className="shop-thumb-tab mb-30">
                <ul className="nav" id="myTab2" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-selected="true"
                    >
                      <img src="img/shop/details/thumb1.jpg" alt="" />{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-selected="false"
                    >
                      <img src="img/shop/details/thumb2.jpg" alt="" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab2"
                      data-bs-toggle="tab"
                      href="#profile1"
                      role="tab"
                      aria-selected="false"
                    >
                      <img src="img/shop/details/thumb3.jpg" alt="" />
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="product-details-img mb-30">
                <div className="tab-content" id="myTabContent2">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                  >
                    <div className="product-large-img">
                      <img src={image} alt="" />
                    </div>
                  </div>
                  {/* <div className="tab-pane fade" id="profile" role="tabpanel">
                    <div className="product-large-img">
                      <img src={image} alt="" />
                    </div>
                  </div> */}
                  {/* <div className="tab-pane fade" id="profile1" role="tabpanel">
                    <div className="product-large-img">
                      <img src={image} alt="" />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="product-details mb-30">
                <div className="product-details-title">
                  <p>{speciality}</p>
                  <h1>{pname}</h1>
                  <div className="price details-price pb-30 mb-20">
                    <span>{price}</span>
                    <span className="old-price">₹ {discount}</span>
                  </div>
                  {/* <p> {}</p> */}
                </div>
                {/* social media options */}
                {/* <div className="product-social mb-45">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-behance"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div> */}
                {/* // procedure options & accomodation code */}
                <div className="faq-right-box">
                  <div id="accordion" className="mt-40">
                    <ProcedureOptions
                      number="One"
                      condition={true}
                      secondClassAdd="show"
                      procedureId={data.id}
                      setOptionPrice={setOptionPrice}
                    />
                    <ProcedureAccomodation
                      number="Two"
                      fistClassAdd="collapsed"
                      procedureId={data.id}
                      setSelectedAccomodationPrice={
                        setSelectedAccomodationPrice
                      }
                    />
                  </div>
                </div>
                <div>
                  <h4>
                    {" "}
                    Total Amount = ₹{calculateTotalPrice()}
                    {/* {optionPrice && selectedAccomodationPrice
                      ? parseFloat(price) + parseFloat(optionPrice) + parseFloat(selectedAccomodationPrice)
                      : optionPrice
                        ? parseFloat(price) + parseFloat(optionPrice)
                        : selectedAccomodationPrice
                          ? parseFloat(price) + parseFloat(selectedAccomodationPrice)
                          : price}           */}
                  </h4>
                </div>
                <br />
                {/* book procedure button */}
                <div className="product-details-action">
                  <form action="#">
                    {patient_id !== null && (
                      <li style={{ display: "flex" }}>
                        {/* <Link
                          to="/bookhistory"
                          className="primary_btn btn-icon ml-0"
                          style={{marginRight: "16px",padding:"11px 37px" }}
                          >
                           Pay Now
                        </Link>
                        <Link
                          to="/bookhistory"
                          className="primary_btn btn-icon btn-icon-green ms-0"
                          style={{ marginRight: "10px",padding:"11px 37px" }}

                        >
                           Pay Later
                        </Link> */}
                        {/* <button  className="primary_btn btn-icon ml-0"
                          style={{marginRight: "16px",padding:"11px 37px" }}  onClick={onPay}>Pay Now </button> */}

                        {/* <button  className="primary_btn btn-icon ml-0"
                          style={{marginRight: "16px",padding:"11px 37px" }} onClick={onBookProcedure}>  <Link>Pay Later  </Link></button> */}
                        <Link
                          to="/shopDetails"
                          className="primary_btn btn-icon btn-icon-green ms-0"
                          style={{ marginRight: "10px", padding: "11px 37px" }}
                          onClick={onPay}
                        >
                          Pay Now
                        </Link>
                        <Link
                          to="/bookhistory"
                          className="primary_btn btn-icon btn-icon-green ms-0"
                          style={{ marginRight: "10px", padding: "11px 37px" }}
                          onClick={() => onBookProcedure("pending")}
                        >
                          Pay Later
                        </Link>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailsBanner;
