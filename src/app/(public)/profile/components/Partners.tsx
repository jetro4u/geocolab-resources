"use client";

import React from "react";
import Image from "next/image";

// Define interface for partner data
interface Partner {
  id: number;
  imageSrc: string;
  altText: string;
}

const Partners: React.FC = () => {
  // Dynamic data for partners
  const partnersData: Partner[] = [
    {
      id: 1,
      imageSrc: "/images/partner/partner1.png",
      altText: "partner-image",
    },
    {
      id: 2,
      imageSrc: "/images/partner/partner2.png",
      altText: "partner-image",
    },
    {
      id: 3,
      imageSrc: "/images/partner/partner3.png",
      altText: "partner-image",
    },
    {
      id: 4,
      imageSrc: "/images/partner/partner4.png",
      altText: "partner-image",
    },
  ];

  return (
    <>
      <div className="partner-area pt-100">
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
                  {partnersData.map((partner) => (
                    <div
                      key={partner.id}
                      className="col-lg-3 col-md-3 col-sm-3 col-6"
                    >
                      <div className="partner-item">
                        <Image
                          src={partner.imageSrc}
                          alt={partner.altText}
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

export default Partners;
