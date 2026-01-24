"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Define interface for partner items
interface PartnerItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
}

const Partners: React.FC = () => {
  // Dynamic data for partner items
  const partnersData: PartnerItem[] = [
    {
      id: 1,
      imageSrc: "/images/partner/partner1.png",
      imageAlt: "partner-image",
    },
    {
      id: 2,
      imageSrc: "/images/partner/partner2.png",
      imageAlt: "partner-image",
    },
    {
      id: 3,
      imageSrc: "/images/partner/partner3.png",
      imageAlt: "partner-image",
    },
    {
      id: 4,
      imageSrc: "/images/partner/partner4.png",
      imageAlt: "partner-image",
    },
    {
      id: 5,
      imageSrc: "/images/partner/partner5.png",
      imageAlt: "partner-image",
    },
    {
      id: 6,
      imageSrc: "/images/partner/partner1.png",
      imageAlt: "partner-image",
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
            {partnersData.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="partner-item">
                  <Image
                    src={partner.imageSrc}
                    alt={partner.imageAlt}
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

export default Partners;