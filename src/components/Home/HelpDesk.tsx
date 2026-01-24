"use client";

import React from "react";
import Link from "next/link";

const HelpDesk: React.FC = () => {
  // Dynamic helpdesk items data
  const helpdeskItems = [
    {
      id: 1,
      icon: "flaticon-growth",
      title: "The best consulting services",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
    {
      id: 2,
      icon: "bx bx-dollar",
      title: "Control over the finances system",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="help-desk-area pt-100 pb-75">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6 col-md-12"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="section-title text-start">
                <span className="sub-title">How Can Help You</span>
                <h2>We&apos;re helping teams do their best work</h2>
              </div>
            </div>
            
            <div className="col-lg-6 col-md-12">
              <div className="row">
                {helpdeskItems.map((item) => (
                  <div
                    key={item.id}
                    className="col-lg-6 col-md-6 col-sm-6"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay={item.id * 100}
                  >
                    <div className="single-help-desk-item">
                      <div className="icon">
                        <i className={item.icon}></i>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <Link href={item.link} className="link-btn">
                        Learn More <i className="bx bx-chevron-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpDesk;
