"use client";

import React from "react";
import Image from "next/image";

interface SocialLink {
  url: string;
  iconClass: string;
}

interface TeamMember {
  id: number;
  name: string;
  image: string;
  socialLinks: SocialLink[];
}

const TeamTwo: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
    {
      id: 5,
      name: "Sophia Turner",
      image: "/images/team/team11.jpg",
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
      id: 6,
      name: "Michael Scott",
      image: "/images/team/team12.jpg",
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
      id: 7,
      name: "Olivia Brown",
      image: "/images/team/team13.jpg",
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
      id: 8,
      name: "Daniel Wilson",
      image: "/images/team/team14.jpg",
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
      <div className="team-area pb-75">
        <div className="container">
          <div className="row justify-content-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6">
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
                          <a href={social.url} target="_blank" rel="noreferrer">
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
        </div>
      </div>
    </>
  );
};

export default TeamTwo;
