import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>
        <div className="text-container">
          <span className="big-text big-text-left">SCC</span>
          <span className="big-text big-text-right">N</span>
          <div className="small-text">
            <p>Newton</p>
            <p>School</p>
            <p>Coding</p>
            <p>Club</p>
          </div>
          </div>
        </h1>
      </header>
      <footer className="footer-container">
        <div className="footer-content">
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
</div>
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
            <div className="social-icons">
<a href="https://www.instagram.com/nscc_srm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#E4405F" }}>
  <FaInstagram className="icon" />
</a>
<a href="https://www.linkedin.com/company/newton-school-coding-club-srmist/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "#0077B5" }}>
  <FaLinkedin className="icon" />
</a>
<a href="https://x.com/nsccsrm?lang=en" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: "#000000" }}>
  <FontAwesomeIcon icon={faXTwitter} className="icon" />
</a>

  
</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;