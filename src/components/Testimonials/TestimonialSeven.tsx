"use client";

import React from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialSeven: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Lora Joly",
      role: "Founder at Envato",
      image: "/images/user/user1.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Pellentesque felis nisl ut laoreet euismod vel, integer.",
      rating: 5,
    },
    {
      id: 2,
      name: "David Warner",
      role: "Founder at ThemeForest",
      image: "/images/user/user2.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Pellentesque felis nisl ut laoreet euismod vel, integer.",
      rating: 5,
    },
    {
      id: 3,
      name: "James Anderson",
      role: "Founder at EnvyTheme",
      image: "/images/user/user3.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Pellentesque felis nisl ut laoreet euismod vel, integer.",
      rating: 5,
    },
  ];

  return (
    <>
      <div className="testimonials-area ptb-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title yellow-color">Testimonials</span>
            <h2 className="nunito-font">
              Here’s what our amazing Students are saying
            </h2>
          </div>
          <div className="row justify-content-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="col-xl-4 col-lg-6 col-md-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
                data-aos-delay={index * 100}
              >
                <div className="testimonials-box">
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="bx bxs-star"></i>
                    ))}
                  </div>
                  <p>{testimonial.content}</p>
                  <div className="info d-flex align-items-center">
                    <div className="img">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="title">
                      <h3>{testimonial.name}</h3>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSeven;
