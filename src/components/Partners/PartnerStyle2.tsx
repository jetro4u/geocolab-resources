"use client";

import React from "react";
import Image from "next/image";

const PartnerStyle2: React.FC = () => {
  // Dynamic partners data
  const partners = [
    {
      id: 1,
      image: {
        src: "/images/partner/partner1.png",
        alt: "partner-image",
      },
    },
    {
      id: 2,
      image: {
        src: "/images/partner/partner2.png",
        alt: "partner-image",
      },
    },
    {
      id: 3,
      image: {
        src: "/images/partner/partner3.png",
        alt: "partner-image",
      },
    },
    {
      id: 4,
      image: {
        src: "/images/partner/partner4.png",
        alt: "partner-image",
      },
    },
  ];

  return (
    <>
      <div className="partner-area pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12">
              <div className="partner-title">
                Trusted by world famous companies:
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="partner-item-lists">
                <div className="row align-items-center">
                  {partners.map((partner) => (
                    <div
                      key={partner.id}
                      className="col-lg-3 col-md-3 col-sm-3 col-6"
                    >
                      <div className="partner-item">
                        <Image
                          src={partner.image.src}
                          alt={partner.image.alt}
                          width={130}
                          height={38}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerStyle2;
