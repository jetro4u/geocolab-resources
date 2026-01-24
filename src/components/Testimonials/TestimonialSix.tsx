"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
}

const TestimonialSix: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Lora Joly",
      role: "Founder at Envato",
      image: "/images/user/user1.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel",
    },
    {
      id: 2,
      name: "Alina Smith",
      role: "Founder at EnvyTheme",
      image: "/images/user/user2.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel",
    },
    {
      id: 3,
      name: "James Andy",
      role: "Founder at ThemeForest",
      image: "/images/user/user3.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel",
    },
    {
      id: 4,
      name: "David Warner",
      role: "Founder at Code",
      image: "/images/user/user4.jpg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel",
    },
  ];

  return (
    <>
      <div className="testimonials-area bg-263238 ptb-100">
        <div className="container">
          <div
            className="section-title white-color"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <span className="sub-title">Testimonials</span>
            <h2 className="nunito-font">
              Here&apos;s what our amazing Students are saying
            </h2>
          </div>
          
          <Swiper
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="testimonials-slides-four"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonials-item">
                  <i className="flaticon-left-quotes-sign"></i>
                  <p><q>{testimonial.content}</q></p>
                  <div className="info">
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="img">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={300}
                      height={300}
                    />
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

export default TestimonialSix;
