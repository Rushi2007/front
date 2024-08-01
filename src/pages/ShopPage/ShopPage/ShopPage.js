import React from "react";
import Footer from "../../../components/Shared/Footer";
import ShopBanner from "./ShopBanner/ShopBanner";
import { useLocation } from "react-router-dom";
import HomeThreeNavBar from "../../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const ShopPage = () => {
  const { state } = useLocation();
  const { result } = state;
  console.log(result);

  return (
    <>
      <HomeThreeNavBar />
      <ShopBanner result={result} />
      <Footer />
    </>
  );
};

export default ShopPage;
