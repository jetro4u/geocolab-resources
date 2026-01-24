"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const OurCreativeTeam: React.FC = () => {
  return (
    <>
      <div className="team-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div
                className="team-content"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <span className="sub-title">Our Creative Team</span>
                <h2>Our team believes you deserve only the best</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
                  auctor purus risus, eu vitae neque, a platea sit. Dui nisi
                  tempus in ac arcu. In neque laoreet mi malesuada quam morbi.
                  Nisl sed a risus vitae, platea eget. Tortor, nisl aliquam urna
                  dignissim.
                </p>
                <Link href="/team" className="btn-style-one red-light-color">
                  Meet Our Team <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="team-member-list">
                <ul>
                  <li
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    data-aos-once="true"
                  >
                    <Image
                      src="/images/team/team1.png"
                      alt="member-image"
                      width={165}
                      height={165}
                    />
                  </li>
                  <li
                    data-aos="fade-down"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay="100"
                  >
                    <Image
                      src="/images/team/team2.png"
                      alt="member-image"
                      width={104}
                      height={104}
                    />
                  </li>
                  <li
                    data-aos="fade-down"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay="200"
                  >
                    <Image
                      src="/images/team/team3.png"
                      alt="member-image"
                      width={112}
                      height={112}
                    />
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay="300"
                  >
                    <Image
                      src="/images/team/team4.png"
                      alt="member-image"
                      width={92}
                      height={92}
                    />
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay="400"
                  >
                    <Image
                      src="/images/team/team5.png"
                      alt="member-image"
                      width={108}
                      height={108}
                    />
                  </li>
                  <li
                    data-aos="fade-down"
                    data-aos-duration="800"
                    data-aos-once="true"
                    data-aos-delay="500"
                  >
                    <Image
                      src="/images/team/team6.png"
                      alt="member-image"
                      width={92}
                      height={92}
                    />
                  </li>
                </ul>

                <div className="bg-image">
                  <Image
                    src="/images/shape/bg-shape1.jpg"
                    alt="bg-image"
                    width={930}
                    height={930}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurCreativeTeam;
