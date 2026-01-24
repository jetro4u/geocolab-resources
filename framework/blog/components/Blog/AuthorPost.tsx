"use client";
  
import React from "react";
import Image from "next/image";
import Link from "next/link";

const AuthorPost: React.FC = () => {
  return (
    <>
      <div className="blog-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog1.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Technology</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      25 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      How is technology working with new things?
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="100"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog2.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Design</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      24 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      Top 10 important tips on IT services & design
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog3.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>

                      <Link href="/blog/tags">Startup</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      23 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      How our company works in different ways
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog4.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>

                      <Link href="/blog/tags">Technology</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      22 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      Giving kids and teens a safer experience online
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="100"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog5.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Design</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      21 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      9 apps to help people sharpen their coding skills
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog6.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Startup</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      20 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      A new model for inclusive computer science
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog7.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Technology</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      19 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      How sellers win when housing inventory is low
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="100"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog8.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Design</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      18 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      Branding involves developing strategy to create point
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-6 col-md-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <div className="single-blog-post">
                <div className="image">
                  <Link href="/blog/details" className="d-block">
                    <Image
                      src="/images/blog/blog9.jpg"
                      alt="blog-image"
                      width={860}
                      height={545}
                    />
                  </Link>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <i className="bx bx-purchase-tag-alt"></i>
                      <Link href="/blog/tags">Startup</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar-check"></i>
                      17 Nov, 2024
                    </li>
                  </ul>
                  <h3>
                    <Link href="/blog/details">
                      Bootstrap 5 is open source software you can use
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="col-xl-12 col-lg-12 col-md-12"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="300"
            >
              <div className="pagination-area">
                <div className="nav-links">
                  <Link href="#" className="prev page-numbers">
                    prev
                  </Link>
                  <span className="page-numbers current">1</span>
                  <Link href="#" className="page-numbers">
                    2
                  </Link>
                  <Link href="#" className="page-numbers">
                    3
                  </Link>
                  <Link href="#" className="next page-numbers">
                    next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorPost;
