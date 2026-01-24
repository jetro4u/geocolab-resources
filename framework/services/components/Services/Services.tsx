"use client";

import React from "react";
import Link from "next/link";

const Services: React.FC = () => {
  // Dynamic services data
  const services = [
    {
      id: 1,
      iconClass: "flaticon-assets",
      title: "Property Management",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagidyttis, donec.",
      link: "/services/details",
    },
    {
      id: 2,
      iconClass: "flaticon-mortgage",
      title: "Finance Real Estate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagidyttis, donec.",
      link: "/services/details",
    },
    {
      id: 3,
      iconClass: "flaticon-challenges",
      title: "Business Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagidyttis, donec.",
      link: "/services/details",
    },
    {
      id: 4,
      iconClass: "flaticon-gold-bar",
      title: "Recover Asset Value",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est non feugiat sagidyttis, donec.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="services-area pt-100 bg-f9f9f9 pb-75">
        <div className="container">
          <div className="section-title">
            <span className="sub-title green-color">What We Offer</span>
            <h2 className="nunito-font">
              Everyone deserves the opportunity of home
            </h2>
          </div>
          <div className="row justify-content-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="col-lg-6 col-md-6 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={service.id * 100}
              >
                <div className="services-box">
                  <div className="icon">
                    <i className={service.iconClass}></i>
                  </div>
                  <h3 className="nunito-font">
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

export default Services;
