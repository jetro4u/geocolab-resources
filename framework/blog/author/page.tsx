import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import AuthorPost from "@/components/Blog/AuthorPost";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Author: Anna Smith</h1>
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
              <li>Author</li>
            </ul>
          </div>
        </div>
      </div>

      <AuthorPost />

      <FooterTwo />
    </>
  );
};
