import React, { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Menu, Layout } from "antd";
import axios from 'axios';
import './review.css';
import HomeThreeNavBar from '../HomeThree/HomeThreeNavBar/HomeThreeNavBar';
import Footer from '../../components/Shared/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  HistoryOutlined
} from "@ant-design/icons";
const { Sider, Content } = Layout;

const ReviewPage = () => {
  const { state } = useLocation();
  const { patientId, procedureId } = state;
  const navigate = useNavigate();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to submit the review
      const response = await axios.post(`http://localhost:8081/reviews/${procedureId}`, {
        patientId,
        rating,
        comment,
      });

      // Handle the API response
      console.log(response.data); // Log the response or perform any desired actions
      Swal.fire({
        title: "success!",
        text: "Review Added Scessfully..",
        icon: "success",
        confirmButtonColor: "8fb569",
        confirmButtonText: "OK",
      }); 
      // Clear the form fields after successful submission
      setRating('');
      setComment('');
      navigate('/patientprofile')
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error(error);
    }
  };

  return (
    <div>
      <HomeThreeNavBar />
      <br /><br /><br/><br /><br/>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          className="text-white fs-5 ant-layout ant-layout-has-sider"
          style={{ backgroundColor: "#223645" }}
          breakpoint="md"
          collapsedWidth="0"
        >
          <Menu
            theme="dark"
            onClick={({ key }) => {
              navigate(key);
            }}
            style={{
              marginRight: "-75px",
              marginLeft: "-9px",
              marginTop: "-62px",
              fontSize: "20px",
              padding: "0px 0px 1408px 0px"
            }}
          >
            <br />
            <Menu.Item key="/patientprofile" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="/BookAppointment" icon={<UnorderedListOutlined />}>
              Book Appointment
            </Menu.Item>
            <Menu.Item key="/bookhistory" icon={<HistoryOutlined />}>
              History
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ marginLeft: "250px", marginRight: "-447px" }}>
          <div className="col-xl-5 col-lg-4">
            <div className="service-widget mb-80">
              <div className="widget-title-box mb-30">
                <h3 className="widget-title">Write your review</h3>
              </div>
              <form className="service-contact-form" onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="contact-input contact-icon contact-user mb-20">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Enter ratings"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="contact-input contact-icon contact-mail mb-20">
                      <input
                        type="text"
                        placeholder="Enter comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="ser-form-btn text-center mt-40">
                  <button
                    type="submit"
                    className="primary_btn btn-icon ml-0"
                    style={{ animationDelay: '0.6s' }}
                    tabIndex="0"
                  >
                    <span>+</span>Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer />
    </div>
  );
};

export default ReviewPage;
