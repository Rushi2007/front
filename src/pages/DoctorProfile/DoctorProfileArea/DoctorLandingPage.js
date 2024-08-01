import React from "react";
import Footer from "../../../components/Shared/Footer";
import DoctorProfileArea from "./DoctorProfileArea";
import HomeThreeNavBar from "../../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

function DoctorLandingPage() {
  return (
    <div>
       <>
      <HomeThreeNavBar />
      <DoctorProfileArea />
      <Footer />
    </>
    </div>
  )
}

export default DoctorLandingPage

