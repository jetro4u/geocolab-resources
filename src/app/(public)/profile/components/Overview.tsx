"use client";

import React from "react";
import Image from "next/image";

// Define interfaces for our data
interface OverviewFeature {
  id: number;
  text: string;
  iconClass: string;
}

interface OverviewBox {
  id: number;
  title: string;
  subtitle: string;
  features: OverviewFeature[];
  image: {
    src: string;
    alt: string;
    aosDelay: number;
  };
  reverseOrder?: boolean; // For the second box where content comes first
}

const Overview: React.FC = () => {
  // Dynamic data for the overview boxes
  const overviewBoxes: OverviewBox[] = [
    {
      id: 1,
      title: "Why Choose Us?",
      subtitle: "We are here, to help your startup business",
      features: [
        {
          id: 1,
          text: "Cloud Databases",
          iconClass: "flaticon-draw-check-mark",
        },
        {
          id: 2,
          text: "Website Hosting",
          iconClass: "flaticon-draw-check-mark",
        },
        {
          id: 3,
          text: "Remote Desktop",
          iconClass: "flaticon-draw-check-mark",
        },
        { id: 4, text: "File Backup", iconClass: "flaticon-draw-check-mark" },
      ],
      image: {
        src: "/images/overview/overview1.png",
        alt: "overview",
        aosDelay: 100,
      },
    },
    {
      id: 2,
      title: "Our Goal",
      subtitle: "Best IT & technology service in your area",
      features: [
        {
          id: 1,
          text: "Design & Development",
          iconClass: "flaticon-draw-check-mark",
        },
        {
          id: 2,
          text: "Android Apps Development",
          iconClass: "flaticon-draw-check-mark",
        },
        {
          id: 3,
          text: "Laravel Web Development",
          iconClass: "flaticon-draw-check-mark",
        },
        {
          id: 4,
          text: "React Web Development",
          iconClass: "flaticon-draw-check-mark",
        },
      ],
      image: {
        src: "/images/overview/overview2.png",
        alt: "overview",
        aosDelay: 500,
      },
      reverseOrder: true, // This box has content first, then image
    },
  ];

  return (
    <>
      <div className="overview-area ptb-100 bg-f9f9f9">
        <div className="container">
          {overviewBoxes.map((box) => (
            <div key={box.id} className="overview-box">
              <div className="row align-items-center">
                {/* Image Column */}
                {!box.reverseOrder && (
                  <div className="col-lg-6 col-md-12 overview-image">
                    <Image
                      src={box.image.src}
                      alt={box.image.alt}
                      width={642}
                      height={604}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                      data-aos-delay={box.image.aosDelay}
                    />
                  </div>
                )}

                {/* Content Column */}
                <div className="col-lg-6 col-md-12 overview-content">
                  <span className="sub-title">{box.title}</span>
                  <h2>{box.subtitle}</h2>
                  <ul className="overview-list">
                    {box.features.map((feature, index) => (
                      <li
                        key={feature.id}
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-once="true"
                        data-aos-delay={100 + index * 100}
                      >
                        <span>
                          <i className={feature.iconClass}></i>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Column (for reversed order) */}
                {box.reverseOrder && (
                  <div className="col-lg-6 col-md-12 overview-image">
                    <Image
                      src={box.image.src}
                      alt={box.image.alt}
                      width={697}
                      height={697}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                      data-aos-delay={box.image.aosDelay}
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
