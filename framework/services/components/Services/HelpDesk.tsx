"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define interface for help desk items
interface HelpDeskItem {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  link: string;
}

const HelpDesk: React.FC = () => {
  // Dynamic data for help desk items
  const helpDeskData: HelpDeskItem[] = [
    {
      id: 1,
      iconSrc: "/images/icon/icon1.png",
      iconAlt: "icon",
      title: "Zero Configuration",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
    {
      id: 2,
      iconSrc: "/images/icon/icon2.png",
      iconAlt: "icon",
      title: "Code Security",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
    {
      id: 3,
      iconSrc: "/images/icon/icon3.png",
      iconAlt: "icon",
      title: "Team Management",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
    {
      id: 4,
      iconSrc: "/images/icon/icon4.png",
      iconAlt: "icon",
      title: "Access Controlled",
      description:
        "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit. Sed est non feugiat sagittis, donec.",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="help-desk-area pt-100 pb-75">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">How Can Help You</span>
            <h2>We’re helping teams do their best work</h2>
          </div>
          
          <div className="row justify-content-center">
            {helpDeskData.map((item) => (
              <div
                key={item.id}
                className="col-lg-3 col-md-6 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={item.id * 100}
              >
                <div className="single-help-desk-box">
                  <div className="icon">
                    <Image
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      width={82}
                      height={82}
                    />
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
    </>
  );
};

export default HelpDesk;
