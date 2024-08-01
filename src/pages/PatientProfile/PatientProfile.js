import React from 'react'

import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import HomeThreeHeroSection from "../HomeThree/HomeThreeHeroSection/HomeThreeHeroSection";
import Footer from "../../components/Shared/Footer";
import HomeThreeAboutArea from "../HomeThree/HomeThreeAboutArea/HomeThreeAboutArea";
import PatientProfileArea from './PatientProfileArea/PatientProfileArea';

function PatientProfile() {
  return (
    <div>
      <HomeThreeNavBar />
      <PatientProfileArea />
      <HomeThreeAboutArea />
      <Footer />
    </div>
  )
}

export default PatientProfile