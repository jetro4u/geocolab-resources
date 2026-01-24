import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import SearchResultPost from "@/components/Blog/SearchResultPost";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Search result for: Design</h1>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  Blog
                </Link>
              </li>
              <li>Design</li>
            </ul>
          </div>
        </div>
      </div>

      <SearchResultPost />

      <FooterTwo />
    </>
  );
}