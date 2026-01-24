"use client";

import React from "react";

const Funfacts: React.FC = () => {
  // Dynamic funfacts data
  const funfacts = [
    {
      id: 1,
      icon: "flaticon-employee",
      number: "480",
      text: "CONSULTING SOLUTIONS",
    },
    {
      id: 2,
      icon: "flaticon-projects",
      number: "535",
      text: "COMPLETED CASES",
    },
    {
      id: 3,
      icon: "flaticon-rating",
      number: "655",
      text: "HAPPY CUSTOMERS",
    },
    {
      id: 4,
      icon: "flaticon-expert",
      number: "272",
      text: "EXPERT CONSULTANT",
    },
  ];

  return (
    <>
      <div className="funfacts-area pb-75 bg-fff4f8">
        <div className="container">
          <div className="row justify-content-center">
            {funfacts.map((funfact) => (
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
                    <i className={funfact.icon}></i>
                  </div>
                  <h3>{funfact.number}</h3>
                  <p>{funfact.text}</p>
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
