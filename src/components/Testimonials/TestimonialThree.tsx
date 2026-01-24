"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const TestimonialThree: React.FC = () => {
  // Dynamic testimonial image data
  const testimonialImage = {
    src: "/images/man-with-laptop.png",
    alt: "testimonials-image",
  };

  // Dynamic testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "I never really lost it to begin with.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "Lora Joly",
      position: "Founder at Envato",
    },
    {
      id: 2,
      quote: "Every moment is a fresh beginning.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "David Warner",
      position: "Founder at ThemeForest",
    },
    {
      id: 3,
      quote: "Whatever you do, do it well.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "James Anderson",
      position: "Founder at EnvyTheme",
    },
  ];

  return (
    <>
      <div className="testimonials-area with-top-border ptb-100">
        <div className="container">
          <div className="section-title">
            <span className="sub-title dark-green-color">Testimonials</span>
            <h2 className="nunito-font">
              Here&apos;s what our amazing clients are saying
            </h2>
          </div>
          
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div
                className="testimonials-image"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <Image
                  src={testimonialImage.src}
                  alt={testimonialImage.alt}
                  width={750}
                  height={752}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="testimonials-content">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={25}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="testimonials-slides-two"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="single-testimonials-box">
                        <i className="flaticon-left-quote"></i>
                        <h5>“{testimonial.quote}”</h5>
                        <p>{testimonial.content}</p>
                        <div className="info">
                          <h3>{testimonial.author}</h3>
                          <span>{testimonial.position}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialThree;
