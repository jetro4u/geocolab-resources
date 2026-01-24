"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const About: React.FC = () => {
  // Dynamic about data
  const aboutData = {
    title: "About Us",
    heading: "The story behind our consulting firm",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id proin lectus in aliquam orci ornare nec. Commodo morbi tincidunt egestas velit.",
    image: {
      src: "/images/about/about1.jpg",
      alt: "about",
    },
    buttonText: "More About Us",
    buttonLink: "/about-us",
  };

  // Dynamic features data
  const features = [
    {
      id: 1,
      icon: "bx bx-check-double",
      title: "Integrated Innovation",
      link: "/services/details",
    },
    {
      id: 2,
      icon: "bx bx-check-double",
      title: "Collaborative Culture",
      link: "/services/details",
    },
    {
      id: 3,
      icon: "bx bx-check-double",
      title: "Business Planning",
      link: "/services/details",
    },
    {
      id: 4,
      icon: "bx bx-check-double",
      title: "Professional Team",
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="about-area with-top-border ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div
                className="about-image"
                style={{
                  backgroundImage: `url(${aboutData.image.src})`,
                }}
              >
                <Image
                  src={aboutData.image.src}
                  alt={aboutData.image.alt}
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
              >
                <span className="sub-title">{aboutData.title}</span>
                <h2>{aboutData.heading}</h2>
                <p>{aboutData.description}</p>
                
                <ul className="about-list">
                  {features.map((feature) => (
                    <li key={feature.id}>
                      <div className="icon">
                        <i className={feature.icon}></i>
                      </div>
                      {feature.title}
                      <Link href={feature.link} className="link-btn">
                        <i className="bx bx-chevron-right"></i>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={aboutData.buttonLink}
                  className="btn-style-one red-light-color"
                >
                  {aboutData.buttonText} <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
