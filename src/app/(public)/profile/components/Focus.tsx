"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define interfaces for our data
interface FocusFeature {
  id: number;
  text: string;
  iconClass: string;
}

interface FocusData {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  features: FocusFeature[];
  button: {
    text: string;
    link: string;
    iconClass: string;
  };
}

const Focus: React.FC = () => {
  // Dynamic data for the focus section
  const focusData: FocusData = {
    title: "We Protect You",
    subtitle: "Protect the ones you love with Life Insurance",
    image: {
      src: "/images/man-with-son.png",
      alt: "man-with-son-image",
    },
    features: [
      {
        id: 1,
        text: "We protect your retirement",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 2,
        text: "We have a long history of keeping our promises",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 3,
        text: "Life insurance: for all that's ahead",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 4,
        text: "25 Years of experience",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 5,
        text: "We maintain consistently high ratings",
        iconClass: "flaticon-draw-check-mark",
      },
    ],
    button: {
      text: "Get Started Now",
      link: "/contact",
      iconClass: "bx bx-chevron-right",
    },
  };

  return (
    <>
      <div className="goal-area with-top-border ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="goal-content style-two">
                <span className="sub-title">{focusData.title}</span>
                <h2 className="nunito-font">{focusData.subtitle}</h2>

                <ul className="overview-list">
                  {focusData.features.map((feature) => (
                    <li
                      key={feature.id}
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                      data-aos-delay={feature.id * 100}
                    >
                      <i className={feature.iconClass}></i>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <div
                  className="btn-box"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-once="true"
                >
                  <Link
                    href={focusData.button.link}
                    className="btn-style-one dark-green-color"
                  >
                    {focusData.button.text}{" "}
                    <i className={focusData.button.iconClass}></i>
                  </Link>
                </div>
              </div>
            </div>
            
            <div
              className="col-lg-6 col-md-12"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="goal-image style-two">
                <Image
                  src={focusData.image.src}
                  alt={focusData.image.alt}
                  width={720}
                  height={660}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Focus;
