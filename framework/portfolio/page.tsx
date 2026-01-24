import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import Portfolio from "@/components/Portfolio/Portfolio";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title red-light-color">Portfolio</span>
            <h1>We&apos;ve done lot&apos; of work, Let&apos;s check some</h1>
          </div>
        </div>
      </div>

      <Portfolio />
      
      <FooterTwo />
    </>
  );
};