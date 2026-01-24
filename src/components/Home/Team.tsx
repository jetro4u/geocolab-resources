"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SocialLink {
  url: string;
  iconClass: string;
}

interface TeamMember {
  name: string;
  image: string;
  socialLinks: SocialLink[];
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Franco Gino",
      image: "/images/team/team7.jpg",
      socialLinks: [
        {
          url: "https://www.facebook.com/",
          iconClass: "flaticon-facebook-app-symbol",
        },
        { url: "https://www.twitter.com/", iconClass: "flaticon-twitter" },
        { url: "https://www.linkedin.com/", iconClass: "flaticon-linkedin" },
        { url: "https://www.instagram.com/", iconClass: "flaticon-instagram" },
      ],
    },
    {
      name: "Emila Lucy",
      image: "/images/team/team8.jpg",
      socialLinks: [
        {
          url: "https://www.facebook.com/",
          iconClass: "flaticon-facebook-app-symbol",
        },
        { url: "https://www.twitter.com/", iconClass: "flaticon-twitter" },
        { url: "https://www.linkedin.com/", iconClass: "flaticon-linkedin" },
        { url: "https://www.instagram.com/", iconClass: "flaticon-instagram" },
      ],
    },
    {
      name: "Alina Smith",
      image: "/images/team/team9.jpg",
      socialLinks: [
        {
          url: "https://www.facebook.com/",
          iconClass: "flaticon-facebook-app-symbol",
        },
        { url: "https://www.twitter.com/", iconClass: "flaticon-twitter" },
        { url: "https://www.linkedin.com/", iconClass: "flaticon-linkedin" },
        { url: "https://www.instagram.com/", iconClass: "flaticon-instagram" },
      ],
    },
    {
      name: "Andrea Romeo",
      image: "/images/team/team10.jpg",
      socialLinks: [
        {
          url: "https://www.facebook.com/",
          iconClass: "flaticon-facebook-app-symbol",
        },
        { url: "https://www.twitter.com/", iconClass: "flaticon-twitter" },
        { url: "https://www.linkedin.com/", iconClass: "flaticon-linkedin" },
        { url: "https://www.instagram.com/", iconClass: "flaticon-instagram" },
      ],
    },
  ];

  return (
    <>
      <div className="team-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="team-member-list-style-two">
                <div className="row">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="col-lg-6 col-md-6 col-sm-6"
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-once="true"
                      data-aos-delay={index % 2 === 0 ? 0 : 100}
                    >
                      <div
                        className="single-team-member"
                        style={{ backgroundImage: `url(${member.image})` }}
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name} image`}
                          width={590}
                          height={590}
                        />
                        <div className="content">
                          <h3>{member.name}</h3>
                          <ul className="social">
                            {member.socialLinks.map((social, idx) => (
                              <li key={idx}>
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className={social.iconClass}></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="shape4">
                  <Image
                    src="/images/shape/shape4.png"
                    alt="decorative shape"
                    width={1920}
                    height={811}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="team-content style-two">
                <span className="sub-title">Our Creative Team</span>
                <h2>Our team believes you deserve only the best</h2>
                <p>
                  We are committed to delivering top-quality solutions tailored
                  to your needs. With a dedicated team of professionals, we
                  ensure every project meets the highest standards of
                  excellence, giving you the results and experience you truly
                  deserve.
                </p>
                <Link href="/team" className="btn-style-one red-light-color">
                  Meet Our Team <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
