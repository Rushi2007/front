import React from "react";
import Footer from "../../components/Shared/Footer";
import LoginArea from "./LoginArea/LoginArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import { useLocation } from "react-router-dom";

const Login = () => {

  const location = useLocation();
  console.log('comming data on login page',location)
  const data = location.state?.data ;
  console.log('value of data-->>',data)
  return (
    <>
      <HomeThreeNavBar />
      { data !==null ? <LoginArea data={data} /> : <LoginArea />}
      <Footer />
    </>
  );
};

export default Login;
