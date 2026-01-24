"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const TestimonialTwo: React.FC = () => {
  // Dynamic testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed. Feugiat eu lacus, tortor egestas ut aenean. Est mauris pulvinar at vulputate.",
      userImage: "/images/user/user1.jpg",
      userName: "Lora Joly",
      userTitle: "Founder at Envato",
    },
    {
      id: 2,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed. Feugiat eu lacus, tortor egestas ut aenean. Est mauris pulvinar at vulputate.",
      userImage: "/images/user/user2.jpg",
      userName: "Lora Joly",
      userTitle: "Founder at Envato",
    },
    {
      id: 3,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed. Feugiat eu lacus, tortor egestas ut aenean. Est mauris pulvinar at vulputate.",
      userImage: "/images/user/user3.jpg",
      userName: "Lora Joly",
      userTitle: "Founder at Envato",
    },
    {
      id: 4,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed. Feugiat eu lacus, tortor egestas ut aenean. Est mauris pulvinar at vulputate.",
      userImage: "/images/user/user4.jpg",
      userName: "Lora Joly",
      userTitle: "Founder at Envato",
    },
    {
      id: 5,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna facilisi viverra felis eleifend ornare urna. Eu mauris, velit volutpat massa volutpat. Risus pellentesque felis nisl ut laoreet euismod vel, integer. Massa sodales lorem nisi, sed. Feugiat eu lacus, tortor egestas ut aenean. Est mauris pulvinar at vulputate.",
      userImage: "/images/user/user5.jpg",
      userName: "Lora Joly",
      userTitle: "Founder at Envato",
    },
  ];

  // Dynamic thumbnails data
  const thumbnails = [
    {
      id: 1,
      image: "/images/clients/client1.png",
      alt: "First Thumbnail",
    },
    {
      id: 2,
      image: "/images/clients/client2.png",
      alt: "Second Thumbnail",
    },
    {
      id: 3,
      image: "/images/clients/client3.png",
      alt: "Third Thumbnail",
    },
    {
      id: 4,
      image: "/images/clients/client4.png",
      alt: "Fourth Thumbnail",
    },
    {
      id: 5,
      image: "/images/clients/client5.png",
      alt: "Fifth Thumbnail",
    },
  ];

  const renderCustomThumbs = () => {
    return thumbnails.map((thumb) => (
      <div key={thumb.id} className="owl-thumb-item">
        <div className="item">
          <Image src={thumb.image} alt={thumb.alt} width={130} height={38} />
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="testimonials-area bg-1d2b53 ptb-100">
        <div className="container">
          <div className="section-title white-color">
            <span className="sub-title">Testimonials</span>
            <h2>Here&apos;s what our amazing clients are saying</h2>
          </div>
          <div className="testimonials-slides">
            <Carousel
              showArrows={false}
              showIndicators={false}
              autoPlay={false}
              infiniteLoop={false}
              emulateTouch={true}
              showThumbs={true}
              renderThumbs={renderCustomThumbs}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="single-testimonials-item">
                  <p>{testimonial.quote}</p>
                  <div className="client-info d-flex align-items-center justify-content-center">
                    <Image
                      src={testimonial.userImage}
                      alt="user"
                      width={300}
                      height={300}
                    />
                    <div className="info">
                      <h3>{testimonial.userName}</h3>
                      <span>{testimonial.userTitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialTwo;
