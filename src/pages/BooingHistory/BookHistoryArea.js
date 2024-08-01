import React from "react";
import Footer from "../../components/Shared/Footer";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";
// import ChangePasswordArea from "./ChangePasswordArea/ChangePasswordArea";
import BookingHistory from "./BookingHistoryArea/BookingHistory";

function BookHistoryArea() {
  return (
    <div>
       <>
                <HomeThreeNavBar />
                <BookingHistory />
                <Footer />
            </>
    </div>
  )
}

export default BookHistoryArea
