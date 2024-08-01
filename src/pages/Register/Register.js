import React, { useEffect } from "react";
import Footer from "../../components/Shared/Footer";
import RegisteArea from "./RegisteArea/RegisteArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import { useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  // const data = {
  //   result: result,
  //   id: id,
  //   image: image,
  //   speciality: speciality,
  //   pname: pname,
  //   price: price,
  //   discount: discount,
  // };
  // Perform any logic or side effects based on the state

  // Cleanup or perform additional actions when component unmounts

  const { state } = location;
  const { result, id, image, speciality, pname, price, discount,description } = state || {};

  console.log("booking data===>", result, id, image, speciality, pname, price, discount, description);

  const data = {
    result: result || null,
    id: id || null,
    image: image || null,
    speciality: speciality || null,
    pname: pname || null,
    price: price || null,
    discount: discount || null,
    description: description || null,
  };
  // Perform any logic or side effects based on the state

  // Cleanup or perform additional actions when component unmounts

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <>
      <HomeThreeNavBar />
      <RegisteArea data={data} />
      <Footer />
    </>
  );
};

export default Register;
