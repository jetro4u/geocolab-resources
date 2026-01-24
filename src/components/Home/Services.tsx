"use client";

import React from "react";
import Link from "next/link";

const Services: React.FC = () => {
  // Dynamic services data
  const services = [
    {
      id: 1,
      icon: "flaticon-career",
      title: "Company & Business Setup",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
    {
      id: 2,
      icon: "flaticon-growth",
      title: "Strategic Consulting",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
    {
      id: 3,
      icon: "flaticon-return-of-investment",
      title: "Investment Management",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
    {
      id: 4,
      icon: "flaticon-management-1",
      title: "Company Management",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
    {
      id: 5,
      icon: "flaticon-money",
      title: "Finance Consulting",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
    {
      id: 6,
      icon: "flaticon-human-resources",
      title: "Human Resources",
      description:
        "Lorem ipsum dolor sit amet, adipiscing elit. Dui id duis accumsan, eget aliquam varius. A sodales id nulla amet ultricies eget. At nulla mattis mattis.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="services-area bg-fff4f8 pt-100 pb-75">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Services We Offer</span>
            <h2>We provide high-impact business services</h2>
          </div>
          <div className="row justify-content-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="col-lg-4 col-md-6 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={service.id * 100}
              >
                <div className="single-services-box">
                  <div className="icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3>
                    <Link href={service.link}>{service.title}</Link>
                  </h3>
                  <p>{service.description}</p>
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
