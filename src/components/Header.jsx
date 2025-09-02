import React from "react";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import LanguageSwitchButton from "./LanguageSwitchButton";
import turksatLogo from "../assets/photos/turksatlogo.png";

export default function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="website-header">
      <div className="flex justify-content-between align-items-center w-full">
        {/* Left icons */}
        <div className="flex align-items-center gap-3 left-icons">
          <a
            href="https://www.linkedin.com/company/turksat/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-linkedin" style={{ fontSize: "1.8rem" }}></i>
          </a>
          <a
            href="https://x.com/turksat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-twitter" style={{ fontSize: "1.8rem" }}></i>
            {/* or keep <XOutlined /> if you want exact icon */}
          </a>
          <a
            href="https://www.youtube.com/user/turksatpr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-youtube" style={{ fontSize: "1.8rem" }}></i>
          </a>
        </div>

        {/* Center logo */}
        <div className="text-center center-logo">
          <a
            href="https://www.turksat.com.tr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={turksatLogo} alt="Türksat" className="logo" />
          </a>
        </div>

        {/* Right buttons */}
        <div className="flex align-items-center gap-3 right-buttons">
          <LanguageSwitchButton />
          <Button
            onClick={toggleDarkMode}
            className="dark-mode-button p-button-rounded p-button-text"
            icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
          />
        </div>
      </div>
    </header>
  );
}
