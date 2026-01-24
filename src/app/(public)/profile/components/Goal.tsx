"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define interfaces for our data
interface GoalFeature {
  id: number;
  text: string;
  iconClass: string; 
}

interface GoalData {
  title: string;
  subtitle: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
  features: GoalFeature[];
  button: {
    text: string;
    link: string;
    iconClass: string;
  };
}

const Goal: React.FC = () => {
  // Dynamic data for the goal section
  const goalData: GoalData = {
    title: "About Us",
    subtitle: "Protecting families and their futures",
    image: {
      src: "/images/goal.png",
      alt: "goal-image",
    },
    features: [
      {
        id: 1,
        text: "We invest for long-term results",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 2,
        text: "We manage risk in-house, in real time",
        iconClass: "flaticon-draw-check-mark",
      },
      {
        id: 3,
        text: "Growing your business",
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
      text: "Contact Us",
      link: "/contact",
      iconClass: "bx bx-chevron-right",
    },
  };

  return (
    <>
      <div className="goal-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6 col-md-12"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="goal-image">
                <Image
                  src={goalData.image.src}
                  alt={goalData.image.alt}
                  width={720}
                  height={690}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="goal-content">
                <span className="sub-title">{goalData.title}</span>
                <h2 className="nunito-font">{goalData.subtitle}</h2>

                <ul className="overview-list">
                  {goalData.features.map((feature) => (
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
                    href={goalData.button.link}
                    className="btn-style-one dark-green-color"
                  >
                    {goalData.button.text}{" "}
                    <i className={goalData.button.iconClass}></i>
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

export default Goal;
