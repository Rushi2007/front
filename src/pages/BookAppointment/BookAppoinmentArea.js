import React from "react";
import Footer from "../../components/Shared/Footer";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
import BookAppointment from "./BookAppointment";

function BookAppoinmentArea() {
  return (
    <div>
       <>
                <HomeThreeNavBar />
                <BookAppointment />
                <Footer />
            </>
    </div>
  )
}

export default BookAppoinmentArea
