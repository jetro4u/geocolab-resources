"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC = () => {
  return (
    <>
      <aside className="widget-area">
        <div className="widget widget_search">
          <h3 className="widget-title">
            <span>Search</span>
          </h3>
          <form className="search-form">
            <input
              type="search"
              className="search-field"
              placeholder="Search..."
            />
            <button type="submit">
              <i className="bx bx-search"></i>
            </button>
          </form>
        </div>

        <div className="widget widget_categories">
          <h3 className="widget-title">
            <span>Categories</span>
          </h3>
          <ul>
            <li>
              <Link href="/blog/categories">
                Business <span className="count">(6)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/categories">
                Privacy <span className="count">(4)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/categories">
                Technology <span className="count">(5)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/categories">
                Tips <span className="count">(3)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/categories">
                Log in <span className="count">(8)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog/categories">
                Uncategorized <span className="count">(1)</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="widget widget_posts_thumb">
          <h3 className="widget-title">
            <span>Popular Posts</span>
          </h3>
          <article className="item">
            <Link href="/blog/details" className="thumb">
              <Image
                src="/images/blog/blog1.jpg"
                alt="blog-image"
                width={860}
                height={545}
              />
            </Link>
            <div className="info">
              <h4 className="title">
                <Link href="/blog/details">
                  Standard operating procedures (SOP) changes with an LMS
                </Link>
              </h4>
              <span className="date">19th Sep, 2024</span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <Image
                src="/images/blog/blog2.jpg"
                alt="blog-image"
                width={860}
                height={545}
              />
            </Link>
            <div className="info">
              <h4 className="title">
                <Link href="/blog/details">
                  Questions to ask vendors before choosing an LMS platform
                </Link>
              </h4>
              <span className="date">19th Sep, 2024</span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <Image
                src="/images/blog/blog3.jpg"
                alt="blog-image"
                width={860}
                height={545}
              />
            </Link>
            <div className="info">
              <h4 className="title">
                <Link href="/blog/details">
                  In person, virtual or hybrid: helpful tools for back to school
                </Link>
              </h4>
              <span className="date">19th Sep, 2024</span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <Image
                src="/images/blog/blog4.jpg"
                alt="blog-image"
                width={860}
                height={545}
              />
            </Link>
            <div className="info">
              <h4 className="title">
                <Link href="/blog/details">
                  Corporate online learning trends you still need to implement
                  in 2024
                </Link>
              </h4>
              <span className="date">19th Sep, 2024</span>
            </div>
          </article>
        </div>

        <div className="widget widget_follow_us">
          <h3 className="widget-title">
            <span>Follow Us</span>
          </h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
            </li>
          </ul>
        </div>

        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">
            <span>Tags</span>
          </h3>
          <div className="tagcloud">
            <Link href="/blog/tags">Advertisment</Link>

            <Link href="/blog/tags">Business</Link>

            <Link href="/blog/tags">Life</Link>

            <Link href="/blog/tags">Lifestyle</Link>

            <Link href="/blog/tags">Fashion</Link>

            <Link href="/blog/tags">Ads</Link>

            <Link href="/blog/tags">Advertisment</Link>

            <Link href="/blog/tags">Business</Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
