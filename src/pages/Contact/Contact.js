import React from "react";
import Footer from "../../components/Shared/Footer";
import ContactArea from "./ContactArea/ContactArea";
import ContactFormArea from "./ContactFormArea/ContactFormArea";
import ContactMap from "./ContactMap/ContactMap";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const Contact = () => {
  return (
    <>
      <HomeThreeNavBar />
      <ContactArea />
      {/* <ContactFormArea /> */}
      {/* <ContactMap /> */}
      <Footer />
    </>
  );
};

export default Contact;
