import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePasswordArea from "../../ChangePassword/ChangePasswordArea/ChangePasswordArea";
import ProviderProfileArea from "../../ProviderProfile/ProviderProfileArea/ProviderProfileArea";
import UpdateProcedureArea from "../../UpdateProcedure/UpdateProcedureArea/UpdateProcedureArea";
import DoctorProfileArea from "../../DoctorProfile/DoctorProfileArea/DoctorProfileArea";
import ProviderGallery from "../../ProviderGallery/ProviderGallery";
import ManageProcedure from "../ProviderLandingPageArea/ManageProcedure"

function Content() {
    return (
        <>
          <AllContext>
            <BrowserRouter>
              <ScrollTop />
              <Routes>
                <Route
                  path="/ProviderLandingPage"
                  element={<ProviderLandingPage />}
                />        
                <Route path="/ChangePasswordArea" element ={ <ChangePasswordArea />} />
                <Route path="/ProviderGallery" element ={ <ProviderGallery /> } />
                <Route path="/ProviderProfileArea" element ={ <ProviderProfileArea /> } />
                <Route path="/ManageProcedure" element ={ <ManageProcedure /> } />
                <Route path="/DoctorProfileArea" element ={ <DoctorProfileArea /> } />
              </Routes>
            </BrowserRouter>
          </AllContext>
        </>
      );
}

export default Content
