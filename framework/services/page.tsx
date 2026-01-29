import React from "react";
import Navbar2 from "@/components/Layouts/Navigations/Navbar2";
import HelpDesk from "@/components/Services/HelpDesk";
import Services from "@/components/Services/Services";
import WorkingProcess from "@/components/Services/WorkingProcess";
import GetStarted from "@/components/Services/GetStarted";
import Partners from "@/components/Services/Partners";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";

export default function Page() {
  return (
    <>
      <Navbar2 />

      <div className="page-title-area bg-black">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Our Services</span>
            <h1>Our work is delivered by the best team in the world</h1>
          </div>
        </div>
      </div>

      <HelpDesk />

      <Services />

      <WorkingProcess />

      <div className="pb-100">
        <GetStarted />
      </div>
      
      <div className="bg-fff4f8">
        <Partners />
      </div>
      
      <FooterTwo />
    </>
  );
};