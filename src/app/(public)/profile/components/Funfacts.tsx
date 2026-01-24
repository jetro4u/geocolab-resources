"use client";

import React from "react";

// Define interface for our funfact data
interface FunfactItem {
  id: number;
  iconClass: string;
  number: string;
  description: string;
}

const Funfacts: React.FC = () => {
  // Dynamic data for the funfacts section
  const funfactsData: FunfactItem[] = [
    {
      id: 1,
      iconClass: "flaticon-employee",
      number: "480",
      description: "CONSULTING SOLUTIONS",
    },
    {
      id: 2,
      iconClass: "flaticon-projects",
      number: "535",
      description: "COMPLETED CASES",
    },
    {
      id: 3,
      iconClass: "flaticon-rating",
      number: "655",
      description: "HAPPY CUSTOMERS",
    },
    {
      id: 4,
      iconClass: "flaticon-expert",
      number: "272",
      description: "EXPERT CONSULTANT",
    },
  ];

  return (
    <>
      <div className="funfacts-area pt-100 pb-75 bg-fff4f8">
        <div className="container">
          <div className="row justify-content-center">
            {funfactsData.map((funfact) => (
              <div
                key={funfact.id}
                className="col-lg-3 col-md-3 col-sm-3 col-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={funfact.id * 100}
              >
                <div className="single-funfacts-box">
                  <div className="icon">
                    <i className={funfact.iconClass}></i>
                  </div>
                  <h3>{funfact.number}</h3>
                  <p>{funfact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Funfacts;
