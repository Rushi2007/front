import React from "react";
import Footer from "../../components/Shared/Footer";
import ProviderLandingPageArea from "./ProviderLandingPageArea/ProviderLandingPageArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import ManageProcedure from "./ProviderLandingPageArea/ManageProcedure";

const ProviderLandingPage = () => {
  return (
    <>
      <HomeThreeNavBar />
      <ProviderLandingPageArea />
      <Footer />
    </>
  );
};

export default ProviderLandingPage;
