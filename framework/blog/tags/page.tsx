import React from "react";
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import TagsPost from "@/components/Blog/TagsPost";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Tag: Technology</h1>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blogs">Blog</Link>
              </li>
              <li>Technology</li>
            </ul>
          </div>
        </div>
      </div>

      <TagsPost />

      <FooterTwo />
    </>
  );
};
