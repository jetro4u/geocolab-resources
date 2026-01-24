"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Banner: React.FC = () => {
  // Parallax
  const [bgPosition, setBgPosition] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;

      const scrollPosition = window.scrollY;
      const bannerHeight = bannerRef.current.offsetHeight;
      const speed = 0.5; // Parallax speed (0.1 to 1)

      // Calculate parallax offset (negative for upward movement)
      const offset = -(scrollPosition * speed);
      setBgPosition(offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        ref={bannerRef}
        className="business-banner-area"
        style={{
          backgroundImage: `url(/images/banner/banner-bg1.jpg)`,
          backgroundPosition: `center ${bgPosition}px`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // Creates parallax effect
        }}
      >
        <div className="container-fluid">
          <div className="business-banner-content">
            <h1 data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
              Ready to take your business growth to the next level?
            </h1>

            <p
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="100"
            >
              Unlock your full potential with tailored strategies, innovative
              solutions, and expert guidance designed to accelerate growth,
              expand your reach, and maximize profitability.
            </p>

            <div
              className="btn-box"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
              data-aos-delay="200"
            >
              <Link href="/contact" className="btn-style-one red-light-color">
                Get Started Now <i className="bx bx-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
