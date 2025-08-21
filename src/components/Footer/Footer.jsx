import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
      <div className="container">
        {/* NSCC header (unchanged) */}
        <header className="header">
          <h1>
            <div className="text-container">
              <span className="big-text big-text-left">NSC</span>
              <span className="big-text big-text-right">C</span>
              <div className="small-text">
                <p>Newton</p>
                <p>School</p>
                <p>Coding</p>
                <p>Club</p>
              </div>
            </div>
          </h1>
        </header>

        {/* Footer Section */}
        <footer className="footer-container">
          <div className="footer-content">
            {/* Left Column - Menu + Socials */}
            <div className="left-column">
              <ul className="main-menu">
                <li><a href="#hero">Home</a></li>
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#domains">Domains</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#sponsors">Sponsors</a></li>
                <li><a href="#our-team-section">Our Team</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#follow">Follow Us</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
              </ul>
              <div className="social-wrapper">
                <a
                    href="https://www.instagram.com/nscc_srm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-btn instagram"
                >
                  <FaInstagram />
                </a>
                <a
                    href="https://www.linkedin.com/company/newton-school-coding-club-srmist/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="social-btn linkedin"
                >
                  <FaLinkedin />
                </a>
                <a
                    href="https://x.com/nsccsrm?lang=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="social-btn twitter"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
              </div>
            </div>
            {/* Right Column - Contact & Location */}
            <div className="right-column">
              <div className="contact">
                <h3>Contact Us</h3>
                <p>+91 6230931075</p>
                <p>+91 8789019185</p>
                <p>info@nsccsrm.in</p>
              </div>
              <div className="location">
                <h3>Location</h3>
                <p>Newton School Coding Club SRMIST</p>
                <p>Department of Networking and Communications, School of Computing</p>
                <p>SRM Institute of Science and Technology</p>
                <p>Kattankulathur, Chennai, 603203</p>
                <p>10am—6pm</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} NSCC SRMIST. All rights reserved.
          </div>
        </footer>
      </div>
  );
};

export default Footer;
