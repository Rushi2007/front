import React from "react";
import Footer from "../../components/Shared/Footer";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import ChangePasswordArea from "./ChangePasswordArea/ChangePasswordArea";

function ChangePassword() {
    return (
        <div>
            <>
                <HomeThreeNavBar />
                <ChangePasswordArea />
                <Footer />
            </>
        </div>
    )
}

export default ChangePassword
