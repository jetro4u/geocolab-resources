"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define interfaces
interface ServiceItem {
  id: number;
  iconClass: string;
  text: string;
  link: string;
}

interface OverviewBox {
  id: number;
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  services: ServiceItem[];
  imagePosition: "left" | "right";
}

const Overview: React.FC = () => {
  // Dynamic data for overview boxes
  const overviewBoxes: OverviewBox[] = [
    {
      id: 1,
      title: "We are here, to help your startup business",
      subtitle: "Services We Offer",
      image: {
        src: "/images/overview/overview1.png",
        alt: "overview",
      },
      services: [
        {
          id: 1,
          iconClass: "flaticon-draw-check-mark",
          text: "Cloud Databases",
          link: "/services/details",
        },
        {
          id: 2,
          iconClass: "flaticon-draw-check-mark",
          text: "Website Hosting",
          link: "/services/details",
        },
        {
          id: 3,
          iconClass: "flaticon-draw-check-mark",
          text: "Remote Desktop",
          link: "/services/details",
        },
        {
          id: 4,
          iconClass: "flaticon-draw-check-mark",
          text: "File Backup",
          link: "/services/details",
        },
      ],
      imagePosition: "left",
    },
    {
      id: 2,
      title: "Best IT & technology service in your area",
      subtitle: "Our Services",
      image: {
        src: "/images/overview/overview2.png",
        alt: "overview",
      },
      services: [
        {
          id: 1,
          iconClass: "flaticon-draw-check-mark",
          text: "Design & Development",
          link: "/services/details",
        },
        {
          id: 2,
          iconClass: "flaticon-draw-check-mark",
          text: "Android Apps Development",
          link: "/services/details",
        },
        {
          id: 3,
          iconClass: "flaticon-draw-check-mark",
          text: "Laravel Web Development",
          link: "/services/details",
        },
        {
          id: 4,
          iconClass: "flaticon-draw-check-mark",
          text: "React Web Development",
          link: "/services/details",
        },
      ],
      imagePosition: "right",
    },
  ];

  return (
    <>
      <div className="overview-area ptb-100 bg-f9f9f9">
        <div className="container">
          {overviewBoxes.map((box) => (
            <div key={box.id} className="overview-box">
              <div className="row align-items-center">
                {box.imagePosition === "left" && (
                  <div className="col-lg-6 col-md-12 overview-image">
                    <Image
                      src={box.image.src}
                      data-aos="fade-up"
                      alt={box.image.alt}
                      width={642}
                      height={604}
                    />
                  </div>
                )}

                <div className="col-lg-6 col-md-12 overview-content">
                  <span className="sub-title">{box.subtitle}</span>
                  <h2>{box.title}</h2>
                  <ul className="overview-list">
                    {box.services.map((service) => (
                      <li
                        key={service.id}
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-once="true"
                        data-aos-delay={service.id * 100}
                      >
                        <span>
                          <i className={service.iconClass}></i>
                          <Link href={service.link}>{service.text}</Link>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {box.imagePosition === "right" && (
                  <div className="col-lg-6 col-md-12 overview-image">
                    <Image
                      src={box.image.src}
                      data-aos="fade-up"
                      alt={box.image.alt}
                      width={697}
                      height={697}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
