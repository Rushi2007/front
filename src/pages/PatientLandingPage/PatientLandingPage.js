import React, { useState , useEffect } from "react";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import Footer from "../../components/Shared/Footer";
import PatientLandingPageArea from "./PatientLandingPageArea/PatientLandingPageArea";
import HomeThreeAboutArea from "../HomeThree/HomeThreeAboutArea/HomeThreeAboutArea";
import { useLocation } from "react-router-dom";

function PatientLandingPage() {

  const [data, setData] = useState();

  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setData(state);
    }
  }, [state]);

  
 
  return (
    <div>
      <HomeThreeNavBar />
      <PatientLandingPageArea />
      <HomeThreeAboutArea />
      <Footer />
    </div>
  );
}

export default PatientLandingPage;
