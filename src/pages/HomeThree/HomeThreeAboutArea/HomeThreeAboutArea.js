import React from "react";
import SingleCount from "../../../components/SingleCount/SingleCount";

const HomeThreeAboutArea = () => {
  return (
    <>
      <section className="about-area pt-115 pb-80">
        <div className="container">
          <div className="row align-items-center separator pb-110">
            <div className="col-xl-6 col-lg-6">
              <div className="medical-icon-brand pos-rel f-left">
                <img src="img/about/medi-brand.png" alt="" />
              </div>
              <div className="about-title mb-20 px-2 fix">
                <h1 className="mb-40"> Years Of Experience</h1>
                {/* <h5 className="pink-color m-0">
                  TreatSmart help increase your readers.
                </h5> */}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="about-right-content">
                <p>
                  At TreatSmart, we're dedicated to making quality healthcare
                  accessible and affordable for everyone. We believe that your
                  health should never be compromised due to financial
                  constraints. That's why we've created a unique platform where
                  patients, doctors, and hospitals converge to provide and
                  receive top-notch healthcare services at the lowest cost.{" "}
                  <br />
                  Join us in revolutionizing the healthcare industry. Together,
                  we can bridge the gap between patients and healthcare
                  providers, creating a healthier, happier world. <br />
                  Start your journey to affordable healthcare today. Explore our
                  services, compare prices, and take control of your health!
                </p>
              </div>
            </div>
          </div>
          <div className="row pt-120">
            <SingleCount icon="7" counter="540" title="Hospitals" />
            <SingleCount icon="83" counter="899" title="Surgeries" />
            <SingleCount icon="9" counter="100" title="Awards" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeThreeAboutArea;
