import React from 'react'
import Footer from "../../../components/Shared/Footer";
import HomeThreeNavBar from "../../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import ProviderProfileArea from './ProviderProfileArea';

function ProviderProfile() {
    return (
        <div>
            <>
                <HomeThreeNavBar />
                <ProviderProfileArea />
                <Footer />
            </>
        </div>
    )
}

export default ProviderProfile
