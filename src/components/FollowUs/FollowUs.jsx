import React from "react";
import "./FollowUs.css";

const FollowUs = () => {
  return (
    <div id="follow" className="follow-us-container">
      <div className="left-section">
        <h1 className="title">Follow Us.</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolor.
        </p>
      </div>
      <div className="right-section">
        <a href="https://x.com/nsccsrm?lang=en" target="_blank" rel="noopener noreferrer" className="link twitter">
          X (Twitter)
          <span className="arrow">→</span>
        </a>
        <a href="https://www.instagram.com/nscc_srm/" target="_blank" rel="noopener noreferrer" className="link instagram">
          Instagram
          <span className="arrow">→</span>
        </a>
        <a href="https://www.linkedin.com/company/newton-school-coding-club-srmist/" target="_blank" rel="noopener noreferrer" className="link linkedin">
          LinkedIn
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default FollowUs;
