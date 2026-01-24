"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const MegaMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <li className="nav-item megamenu">
        <Link
          href="#"
          className="dropdown-toggle nav-link"
          onClick={(e) => e.preventDefault()}
        >
          Features
        </Link>

        <ul className="dropdown-menu">
          <li className="nav-item">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3 mtb-5">
                  <ul className="megamenu-submenu">
                    <li className="nav-item">
                      <Link
                        href="/services/"
                        className={`nav-link ${
                          pathname == "/services/" && "active"
                        }`}
                      >
                        Services Style 01
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/services/2/"
                        className={`nav-link ${
                          pathname == "/services/2/" && "active"
                        }`}
                      >
                        Services Style 02
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/services/3/"
                        className={`nav-link ${
                          pathname == "/services/3/" && "active"
                        }`}
                      >
                        Services Style 03
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/services/4/"
                        className={`nav-link ${
                          pathname == "/services/4/" && "active"
                        }`}
                      >
                        Services Style 04
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/services/details/"
                        className={`nav-link ${
                          pathname == "/services/details/" && "active"
                        }`}
                      >
                        Services Details
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mtb-5">
                  <ul className="megamenu-submenu">
                    <li className="nav-item">
                      <Link
                        href="/features/"
                        className={`nav-link ${
                          pathname == "/features/" && "active"
                        }`}
                      >
                        Features
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/team/"
                        className={`nav-link ${
                          pathname == "/team/" && "active"
                        }`}
                      >
                        Team
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/pricing/"
                        className={`nav-link ${
                          pathname == "/pricing/" && "active"
                        }`}
                      >
                        Pricing
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/courses/"
                        className={`nav-link ${
                          pathname == "/courses/" && "active"
                        }`}
                      >
                        Courses
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/courses/details/"
                        className={`nav-link ${
                          pathname == "/courses/details/" && "active"
                        }`}
                      >
                        Courses Details
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mtb-5">
                  <ul className="megamenu-submenu">
                    <li className="nav-item">
                      <Link
                        href="/blog/"
                        className={`nav-link ${
                          pathname == "/blog/" && "active"
                        }`}
                      >
                        Blog Grid
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/blog/left-sidebar/"
                        className={`nav-link ${
                          pathname == "/blog/left-sidebar/" && "active"
                        }`}
                      >
                        Blog Left Sidebar
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/blog/right-sidebar/"
                        className={`nav-link ${
                          pathname == "/blog/right-sidebar/" && "active"
                        }`}
                      >
                        Blog Right Sidebar
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/blog/special/"
                        className={`nav-link ${
                          pathname == "/blog/special/" && "active"
                        }`}
                      >
                        Blog Special
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href="/blog/details/"
                        className={`nav-link ${
                          pathname == "/blog/details/" && "active"
                        }`}
                      >
                        Blog Details
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-12 col-sm-6 col-md-3 mtb-5">
                  <Link href="/courses/" className="d-block p-0">
                    <Image
                      src="/images/navbar.jpg"
                      alt="image"
                      width={860}
                      height={520}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </>
  );
};

export default MegaMenu;
