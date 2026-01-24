"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Define interfaces for our data
interface AboutFeature {
  id: number;
  title: string;
  link: string;
}

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  features: AboutFeature[];
}

const AboutArea: React.FC = () => {
  // Dynamic data for the about section
  const aboutData: AboutData = {
    title: "About Us",
    subtitle: "The story behind our consulting firm",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id proin lectus in aliquam orci ornare nec. Commodo morbi tincidunt egestas velit.",
    imageSrc: "/images/about/about1.jpg",
    features: [
      { id: 1, title: "Integrated Innovation", link: "/services/details" },
      { id: 2, title: "Collaborative Culture", link: "/services/details" },
      { id: 3, title: "Business Planning", link: "/services/details" },
      { id: 4, title: "Professional Team", link: "/services/details" },
      { id: 5, title: "13+ Years Experience", link: "/services/details" },
    ],
  };

  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div
                className="about-image"
                style={{
                  backgroundImage: `url(${aboutData.imageSrc})`,
                }}
              >
                <Image
                  src={aboutData.imageSrc}
                  alt="about"
                  width={720}
                  height={876}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div
                className="about-content"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay="100"
              >
                <span className="sub-title">{aboutData.title}</span>
                <h2>{aboutData.subtitle}</h2>
                <p>{aboutData.description}</p>
                <ul className="about-list">
                  {aboutData.features.map((feature) => (
                    <li key={feature.id}>
                      <div className="icon">
                        <i className="bx bx-check-double"></i>
                      </div>
                      {feature.title}
                      <Link href={feature.link} className="link-btn" passHref>
                        <i className="bx bx-chevron-right"></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutArea;
