import React from "react";
import Footer from "../../../components/Shared/Footer";
import ShopDetailsBanner from "./ShopDetailsBanner/ShopDetailsBanner";
import ShopDetailsDesc from "./ShopDetailsDesc/ShopDetailsDesc";
import { useLocation } from "react-router-dom";
import HomeThreeNavBar from "../../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const ShopDetails = () => {
  const { state } = useLocation();
  const {
    id,
    image,
    speciality,
    pname,
    price,
    discount,
    description,
    provider_name,
    address,
    city,
    country,
    phone,
    doctor_name,
    doctor_id,
  } = state;
  console.log("1==>", id);

  const data = {
    id: id,
    image: image,
    speciality: speciality,
    pname: pname,
    price: price,
    discount: discount,
    description: description,
    provider_name: provider_name,
    address: address,
    city: city,
    country: country,
    phone: phone,
    doctor_name: doctor_name,
    doctor_id: doctor_id,
  };

  console.log("ID>>>>>>>>1", data);
  return (
    <>
      <HomeThreeNavBar />
      <ShopDetailsBanner data={data} />
      <ShopDetailsDesc
        procedureId={data.id}
        pname={data.pname}
        description={data.description}
        provider_name={data.provider_name}
        address={data.address}
        city={data.city}
        country={data.country}
        phone={data.phone}
        doctor_name={data.doctor_name}
        doctor_id={data.doctor_id}
      />
      <Footer />
    </>
  );
};

export default ShopDetails;
