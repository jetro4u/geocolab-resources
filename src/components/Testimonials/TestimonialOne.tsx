"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const TestimonialOne: React.FC = () => {
  // Dynamic testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "I never really lost it to begin with.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "Lora Joly",
      position: "Founder at Envato",
      image: {
        src: "/images/user/user8.jpg",
        alt: "user",
      },
    },
    {
      id: 2,
      quote: "Every moment is a fresh beginning.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "David Warner",
      position: "Founder at ThemeForest",
      image: {
        src: "/images/user/user9.jpg",
        alt: "user",
      },
    },
    {
      id: 3,
      quote: "Whatever you do, do it well.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "James Anderson",
      position: "Founder at EnvyTheme",
      image: {
        src: "/images/user/user10.jpg",
        alt: "user",
      },
    },
  ];

  return (
    <>
      <div className="testimonials-area pt-100 pb-75">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <span className="sub-title light-green-color">Testimonials</span>
            <h2>Here&apos;s what our amazing clients are saying</h2>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 6000,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="testimonials-slides-two"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="single-testimonials-box">
                  <div className="row align-items-center">
                    <div className="col-lg-7 col-md-7">
                      <i className="flaticon-left-quote"></i>
                      <h5>“{testimonial.quote}”</h5>
                      <p>{testimonial.content}</p>
                      <div className="info">
                        <h3>{testimonial.author}</h3>
                        <span>{testimonial.position}</span>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-5 text-center">
                      <div className="img">
                        <Image
                          src={testimonial.image.src}
                          alt={testimonial.image.alt}
                          width={300}
                          height={290}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TestimonialOne;
