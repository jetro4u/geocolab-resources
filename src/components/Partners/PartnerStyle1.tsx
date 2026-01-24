"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const PartnerStyle1: React.FC = () => {
  // Dynamic partners data
  const partners = [
    {
      id: 1,
      image: "/images/partner/partner1.png",
      alt: "partner-image",
    },
    {
      id: 2,
      image: "/images/partner/partner2.png",
      alt: "partner-image",
    },
    {
      id: 3,
      image: "/images/partner/partner3.png",
      alt: "partner-image",
    },
    {
      id: 4,
      image: "/images/partner/partner4.png",
      alt: "partner-image",
    },
    {
      id: 5,
      image: "/images/partner/partner5.png",
      alt: "partner-image",
    },
    {
      id: 6,
      image: "/images/partner/partner1.png",
      alt: "partner-image",
    },
  ];

  return (
    <>
      <div className="partner-area ptb-100">
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
                    src={partner.image}
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

export default PartnerStyle1;
