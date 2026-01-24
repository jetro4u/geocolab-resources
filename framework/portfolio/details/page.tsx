import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import PortfolioDetailsContent from "@/components/Portfolio/PortfolioDetailsContent";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Finance Consulting</h1>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li>Finance Consulting</li>
            </ul>
          </div>
        </div>
      </div>
      
      <PortfolioDetailsContent />

      <FooterTwo />
    </>
  );
};
