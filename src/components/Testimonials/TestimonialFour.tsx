"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const TestimonialFour: React.FC = () => {
  // Dynamic testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "I never really lost it to begin with.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "Lora Joly",
      position: "Founder at Envato",
    },
    {
      id: 2,
      quote: "Every moment is a fresh beginning.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "David Warner",
      position: "Founder at ThemeForest",
    },
    {
      id: 3,
      quote: "Whatever you do, do it well. From now!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "James Anderson",
      position: "Founder at EnvyTheme",
    },
    {
      id: 4,
      quote: "Whatever you do, do it well. From now!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "James MM",
      position: "Founder at HB",
    },
    {
      id: 5,
      quote: "Whatever you do, do it well. From now!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed massa volutpat.",
      author: "Jisan HR",
      position: "Founder at HIBO",
    },
  ];

  return (
    <>
      <div className="testimonials-area ptb-100">
        <div className="container">
          <div
            className="section-title"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            <span className="sub-title green-color">Testimonials</span>
            <h2 className="nunito-font">
              Here&apos;s what our amazing clients are saying
            </h2>
          </div>

          <div className="row m-0">
            <div className="col-lg-6 col-md-12 p-0">
              <div
                className="testimonials-img"
                style={{
                  backgroundImage: `url(/images/phone-call.jpg)`,
                }}
              >
                <Image
                  src="/images/phone-call.jpg"
                  alt="testimonials-image"
                  width={720}
                  height={656}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 p-0">
              <div className="testimonials-content-style-two">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={25}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Pagination, Autoplay]}
                  className="testimonials-slides-two"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="single-testimonials-box">
                        <i className="flaticon-left-quote"></i>
                        <h5><q>{testimonial.quote}</q></h5>
                        <p>{testimonial.description}</p>
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

export default TestimonialFour;
