import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import FaqOne from "@/components/Faq/FaqOne";
import PartnerStyle1 from "@/components/Partners/PartnerStyle1";
import FooterOne from "@/components/Layouts/Footer/FooterOne";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Frequently Ask & Question</span>
            <h1>Ciao! How Can We Help You?</h1>
            <form>
              <label>
                <i className="bx bx-search"></i>
              </label>
              <input
                type="text"
                className="input-search"
                placeholder="Search a question..."
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>

      <FaqOne />

      <PartnerStyle1 />
      
      <FooterOne />
    </>
  );
};
