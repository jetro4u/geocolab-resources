"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Blog: React.FC = () => {
  // Dynamic blog posts data
  const blogPosts = [
    {
      id: 1,
      image: {
        src: "/images/blog/blog1.jpg",
        alt: "blog-image",
      },
      tag: "Technology",
      tagLink: "/blog/tags",
      date: "25 Nov, 2024",
      title: "How is technology working with new things?",
      link: "/blog/details",
    },
    {
      id: 2,
      image: {
        src: "/images/blog/blog2.jpg",
        alt: "blog-image",
      },
      tag: "Design",
      tagLink: "/blog/tags",
      date: "24 Nov, 2024",
      title: "Top 10 important tips on IT services & design",
      link: "/blog/details",
    },
    {
      id: 3,
      image: {
        src: "/images/blog/blog3.jpg",
        alt: "blog-image",
      },
      tag: "Startup",
      tagLink: "/blog/tags",
      date: "23 Nov, 2024",
      title: "How our company works in different ways",
      link: "/blog/details",
    },
  ];

  return (
    <>
      <div className="blog-area pt-100 pb-75">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Latest News</span>
            <h2>Our latest articles & resources</h2>
          </div>
          <div className="row justify-content-center">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="col-xl-4 col-lg-6 col-md-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={post.id * 100}
              >
                <div className="single-blog-post">
                  <div className="image">
                    <Link href={post.link} className="d-block">
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        width={860}
                        height={545}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <ul className="meta">
                      <li>
                        <i className="bx bx-purchase-tag-alt"></i>
                        <Link href={post.tagLink}>{post.tag}</Link>
                      </li>
                      <li>
                        <i className="bx bx-calendar-check"></i>
                        {post.date}
                      </li>
                    </ul>
                    <h3>
                      <Link href={post.link}>{post.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
