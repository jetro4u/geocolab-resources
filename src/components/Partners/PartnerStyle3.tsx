"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const PartnerStyle3: React.FC = () => {
  // Dynamic partner data
  const partners = [
    {
      id: 1,
      src: "/images/partner/partner1.png",
      alt: "partner-image",
    },
    {
      id: 2,
      src: "/images/partner/partner2.png",
      alt: "partner-image",
    },
    {
      id: 3,
      src: "/images/partner/partner3.png",
      alt: "partner-image",
    },
    {
      id: 4,
      src: "/images/partner/partner4.png",
      alt: "partner-image",
    },
    {
      id: 5,
      src: "/images/partner/partner5.png",
      alt: "partner-image",
      width: 130,
      height: 38,
    },
    {
      id: 6,
      src: "/images/partner/partner1.png", 
      alt: "partner-image",
    },
  ];

  return (
    <>
      <div className="partner-area ptb-100 bg-f9f9f9 br-bottom-100">
        <div className="container">
          <Swiper
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 5,
              },
            }}
            autoplay={{
              delay: 6000,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="partner-slides"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="partner-item">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={130}
                    height={38}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default PartnerStyle3;