"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const TestimonialFive: React.FC = () => {
  // Dynamic testimonials data
  const testimonialsData = [
    {
      id: 1,
      quote: "I never really lost it to begin with.",
      text: "Working with this team has been an absolute game-changer. Their dedication, attention to detail, and creativity helped us transform our vision into reality faster than we imagined.",
      name: "Lora Joly",
      title: "Founder at Envato",
    },
    {
      id: 2,
      quote: "Every moment is a fresh beginning.",
      text: "They truly understand what it means to deliver quality. From planning to execution, the process was seamless and the results exceeded our expectations.",
      name: "David Warner",
      title: "Founder at ThemeForest",
    },
    {
      id: 3,
      quote: "Whatever you do, do it well. From now!",
      text: "I was impressed by their professionalism and innovative ideas. The final product not only met our goals but also gave us a competitive edge in the market.",
      name: "James Anderson",
      title: "Founder at EnvyTheme",
    },
    {
      id: 4,
      quote: "Great work speaks louder than promises.",
      text: "Their ability to listen, adapt, and deliver exactly what we needed was outstanding. I would recommend them to anyone looking for reliable and creative solutions.",
      name: "James MM",
      title: "Founder at HB",
    },
    {
      id: 5,
      quote: "Turning ideas into reality is their superpower.",
      text: "From the first meeting to the final delivery, the experience was exceptional. Their passion and commitment made us feel confident every step of the way.",
      name: "Jisan HR",
      title: "Founder at HIBO",
    },
  ];

  return (
    <>
      <div className="testimonials-area with-top-border o-hidden ptb-100">
        <div className="container-fluid">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <h2 className="nunito-font">
              Here&apos;s what our amazing clients are saying
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur mauris amet, placerat fames orci elementum adipiscing.
            </p>
          </div>

          <Swiper
            spaceBetween={25}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            autoHeight={true}
            autoplay={{
              delay: 6000,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              1: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="testimonials-slides-three"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="single-testimonials-box">
                  <i className="flaticon-left-quote"></i>
                  <h5>“{testimonial.quote}”</h5>
                  <p>{testimonial.text}</p>
                  <div className="info">
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.title}</span>
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

export default TestimonialFive;
