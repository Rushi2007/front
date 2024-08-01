import React from "react";
import Footer from "../../components/Shared/Footer";
import ForgotPasswordArea from "./ForgotPasswordArea/ForgotPasswordArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const ForgotPassword = () => {
  return (
    <>
      <HomeThreeNavBar />
      <ForgotPasswordArea />
      <Footer />
    </>
  );
};

export default ForgotPassword;
