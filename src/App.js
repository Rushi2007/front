import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import ScrollTop from "./components/ScrollTop";
import AllContext from "./context/AllContext";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/HomeThree/HomeThree";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ShopDetails from "./pages/ShopDetails/ShopDetails/ShopDetails";
import ShopPage from "./pages/ShopPage/ShopPage/ShopPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import DoctorDetails from "./pages/Doctors/DoctorDetails/DoctorDetails";
import AddNewDoctorArea from "./pages/DoctorProfile/DoctorProfileArea/AddNewDoctorArea";
import ProviderLandingPage from "./pages/ProviderLandingPage/ProviderLandingPage";
import PatientLandingPage from "./pages/PatientLandingPage/PatientLandingPage";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import BookDoctorsArea from "./pages/BookDoctors/BookDoctorsArea/BookDoctorsArea";
import BookingHistoryArea from "./pages/BooingHistory/BookingHistoryArea/BookingHistoryArea";
import ReviewPage from "./pages/AddReviewForm/ReviewPage";
import UpdateProcedureArea from "./pages/UpdateProcedure/UpdateProcedureArea/UpdateProcedureArea";
import UpadateDoctorArea from "./pages/DoctorProfile/DoctorProfileArea/UpadateDoctorArea";
import ManageProcedure from "./pages/ProviderLandingPage/ProviderLandingPageArea/ManageProcedure";
import DoctorProfileArea from "./pages/DoctorProfile/DoctorProfileArea/DoctorProfileArea";
import DoctorLandingPage from "./pages/DoctorProfile/DoctorProfileArea/DoctorLandingPage";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ProviderProfile from "./pages/ProviderProfile/ProviderProfileArea/ProviderProfile";
import ProviderGallaeryPage from "./pages/ProviderGallery/ProviderGallaeryPage";
import SideBar from "./pages/PatientLandingPage/PatientLandingPageArea/SideBar";
import BookAppointment from "./pages/BookAppointment/BookAppointment";
import BookAppoinmentArea from "./pages/BookAppointment/BookAppoinmentArea";
import BookingHistory from "./pages/BooingHistory/BookingHistoryArea/BookingHistory";
import BookHistoryArea from "./pages/BooingHistory/BookHistoryArea";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AddInsuranceDetails from "./pages/AddInsuranceDetails/AddInsuranceDetails";
import AddAccomodationDetails from "./pages/AddAccomodation/AddAccomodationDetails";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <AllContext>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/doctorDetails" element={<DoctorDetails />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shopDetails" element={<ShopDetails />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/notMatch" element={<NotFound />} />
            <Route path="/Review" element={<ReviewPage />} />
            <Route
              path="/ProviderLandingPage"
              element={<ProviderLandingPage />}
            />
             <Route
              path="/AddAccomodationDetails"
              element={<AddAccomodationDetails />}
            />
            <Route
              path="/patientlandingpage"
              element={<PatientLandingPage />}
            />  
            <Route path="/patientprofile" element={<PatientProfile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/BookAppointment" element={<BookAppoinmentArea />} />
            <Route path="/AddNewDoctorArea" element={<AddNewDoctorArea />} />
            <Route path="/bookdoctors" element ={<BookDoctorsArea/>} />
            <Route path="/bookhistory" element ={ <BookHistoryArea />} />
            <Route path="/UpdateProcedureArea" element ={ <UpdateProcedureArea/>} />
            <Route path="/UpadateDoctorArea" element ={ <UpadateDoctorArea/> } />
            <Route path="/UpadateDoctorArea" element ={ <UpadateDoctorArea/> } />
            <Route path="/ChangePasswordArea" element ={ <ChangePassword />} />
            <Route path="/ProviderGallery" element ={ <ProviderGallaeryPage /> } />
            <Route path="/ProviderProfileArea" element ={ <ProviderProfile /> } />
            <Route path="/ManageProcedure" element ={ <ManageProcedure /> } />
            <Route path="/DoctorProfileArea" element ={ <DoctorLandingPage /> } />
            <Route path="/SideBar" element ={ <SideBar /> } />
            <Route path="/AddInsuranceDetails" element={ <AddInsuranceDetails />}/>
            <Route path="/reset/password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </AllContext>
    </>
  );
}

export default App;
