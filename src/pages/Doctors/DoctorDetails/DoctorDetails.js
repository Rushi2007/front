import React from "react";
import Footer from "../../../components/Shared/Footer";
import HomeThreeNavBar from "../../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import DoctorDetailsArea from "./DoctorDetailsArea/DoctorDetailsArea";

const DoctorDetails = () => {
  return (
    <>
      <HomeThreeNavBar />
      <DoctorDetailsArea />
      <Footer />
    </>
  );
};

export default DoctorDetails;
