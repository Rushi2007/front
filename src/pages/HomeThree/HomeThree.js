import React from "react";
import Footer from "../../components/Shared/Footer";
import HomeThreeAboutArea from "./HomeThreeAboutArea/HomeThreeAboutArea";
import HomeThreeFactArea from "./HomeThreeFactArea/HomeThreeFactArea";
import HomeThreeFaq from "./HomeThreeFaq/HomeThreeFaq";
import HomeThreeHeroSection from "./HomeThreeHeroSection/HomeThreeHeroSection";
import HomeThreeNavBar from "./HomeThreeNavBar/HomeThreeNavBar";
import HomeThreeTeams from "./HomeThreeTeams/HomeThreeTeams";
import PatientLandingPage from "../PatientLandingPage/PatientLandingPage";
// import Chatbot from "../../components/Chatbot/Chatbot"; // Import the Chatbot component

const HomeThree = () => {
  const patientId = localStorage.getItem("patient_id");
  return (
    <>
      {/* {!patientId ?
        <><HomeThreeNavBar /><HomeThreeHeroSection /><HomeThreeAboutArea /><HomeThreeFactArea /><HomeThreeTeams /><HomeThreeFaq /><Footer /></> :
        <PatientLandingPage />
        } */}
      <HomeThreeNavBar />
      <HomeThreeHeroSection />
      <HomeThreeAboutArea />
      <HomeThreeFactArea />
      {/* <HomeThreeTeams /> */}
      {/* <HomeThreeFaq /> */}
      {/* <Chatbot /> Render the Chatbot component */}
      <Footer />
    </>
  );
};

export default HomeThree;
