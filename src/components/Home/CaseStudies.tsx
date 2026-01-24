"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const CaseStudies: React.FC = () => {
  // Dynamic case studies data
  const caseStudies = [
    {
      id: 1,
      image: {
        src: "/images/case-studies/case-studies1.jpg",
        alt: "case-studies-image",
      },
      icon: "flaticon-startup",
      title: "Business Startup",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Sed est non feugiat sagi ttis donec dolor sit.",
      link: "/portfolio/details",
    },
    {
      id: 2,
      image: {
        src: "/images/case-studies/case-studies2.jpg",
        alt: "case-studies-image",
      },
      icon: "flaticon-consulting",
      title: "Finance Consulting",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Sed est non feugiat sagi ttis donec dolor sit.",
      link: "/portfolio/details",
    },
    {
      id: 3,
      image: {
        src: "/images/case-studies/case-studies3.jpg",
        alt: "case-studies-image",
      },
      icon: "flaticon-personal-wealth",
      title: "Wealth Management",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Sed est non feugiat sagi ttis donec dolor sit.",
      link: "/portfolio/details",
    },
    {
      id: 4,
      image: {
        src: "/images/case-studies/case-studies4.jpg",
        alt: "case-studies-image",
      },
      icon: "flaticon-management",
      title: "Business Planning",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipis cing elit. Sed est non feugiat sagi ttis donec dolor sit.",
      link: "/portfolio/details",
    },
  ];

  return (
    <>
      <div className="case-studies-area with-top-border pt-100 bg-color">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <span className="sub-title">Case Studies</span>
            <h2>We&apos;ve done lot&apos;s of work, Let&apos;s check some</h2>
          </div>
        </div>

        <div className="container-fluid">
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="case-studies-slides"
          >
            {caseStudies.map((caseStudy) => (
              <SwiperSlide key={caseStudy.id}>
                <div className="single-case-studies-box">
                  <Link href={caseStudy.link} className="d-block image">
                    <Image
                      src={caseStudy.image.src}
                      alt={caseStudy.image.alt}
                      width={860}
                      height={540}
                    />
                  </Link>
                  <div className="content">
                    <div className="icon">
                      <i className={caseStudy.icon}></i>
                    </div>
                    <h3>
                      <Link href={caseStudy.link} className="link-btn">
                        {caseStudy.title}
                      </Link>
                    </h3>
                    <p>{caseStudy.description}</p>
                    <Link href={caseStudy.link} className="link-btn">
                      Learn More <i className="bx bx-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
