import React from 'react'
import Footer from "../../components/Shared/Footer";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
// import ProviderProfile from '../ProviderProfile/ProviderProfileArea/ProviderProfile';
import ProviderGallery from './ProviderGallery';

function ProviderGallaeryPage() {
  return (
    <div>
      <>
      <HomeThreeNavBar />
       <ProviderGallery/>
      <Footer />
    </>
    </div>
  )
}

export default ProviderGallaeryPage
