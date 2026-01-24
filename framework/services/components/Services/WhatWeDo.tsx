"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define interface for service items
interface ServiceItem {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  link: string;
}

const WhatWeDo: React.FC = () => {
  // Dynamic data for service items
  const servicesData: ServiceItem[] = [
    {
      id: 1,
      iconSrc: "/images/icon/icon5.png",
      iconAlt: "icon",
      title: "Incredible Infrastructure",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed est. Our work is delivered by the best team in the world.",
      link: "/services/details",
    },
    {
      id: 2,
      iconSrc: "/images/icon/icon6.png",
      iconAlt: "icon",
      title: "Deadline Reminders",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed est. Our work is delivered by the best team in the world.",
      link: "/services/details",
    },
    {
      id: 3,
      iconSrc: "/images/icon/icon7.png",
      iconAlt: "icon",
      title: "Information Retrieval",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed est. Our work is delivered by the best team in the world.",
      link: "/services/details",
    },
    {
      id: 4,
      iconSrc: "/images/icon/icon8.png",
      iconAlt: "icon",
      title: "Simple Dashboard",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipi scing elit sed est. Our work is delivered by the best team in the world.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="what-we-do-area pt-100 pb-75">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">What We Do</span>
            <h2>Our work is delivered by the best team in the world</h2>
          </div>
          <div className="row justify-content-center">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="col-lg-6 col-md-6 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={service.id * 100}
              >
                <div className="single-what-we-do-box">
                  <div className="icon">
                    <Image
                      src={service.iconSrc}
                      alt={service.iconAlt}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3>
                    <Link href={service.link}>{service.title}</Link>
                  </h3>
                  <p>{service.description}</p>
                  <Link href={service.link} className="link-btn">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeDo;
