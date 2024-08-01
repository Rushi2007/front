import React from "react";
import Footer from "../../components/Shared/Footer";
import ShoppingCartArea from "./ShoppongCartArea/ShoppingCartArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const ShoppingCart = () => {
  return (
    <>
      <HomeThreeNavBar />
      <ShoppingCartArea />
      <Footer />
    </>
  );
};

export default ShoppingCart;
