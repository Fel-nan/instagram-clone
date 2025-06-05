import React from "react";
import googlePlay from "../assets/Google_Play_Store_badge_EN.svg.webp"; // Add the correct file name
import appStore from "../assets/download-on-the-app-store.svg";     // Or PNG if you prefer

const LogLayout = ({ children }) => {
  return (
    <div className="main-layout">
      {children}
      <div className="layout">
        <h1>Get the app</h1>
        <div className="store-buttons">
          <a  className="store" href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={googlePlay} alt="Get it on Google Play"  />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={appStore} alt="Download on the App Store" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogLayout;
