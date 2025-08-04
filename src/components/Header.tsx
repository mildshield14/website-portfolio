import React, { useState } from "react";
import "../scss/Header.scss";
import getTranslation from "../getTranslation.ts";

// @ts-ignore
type HeaderProps = {
  changeLang?: (lang: any) => void;
  changeSource?: (newSrc: any) => void;
  size: any;
};

const Header: React.FC<HeaderProps> = ({ size, changeSource, changeLang }) => {
  const [isCheckedMode, setIsCheckedMode] = useState(true); // Default checked state
  const [lang, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsCheckedMode(!isCheckedMode);
    if (isCheckedMode) {
      document.documentElement.style.setProperty(
        "--selected-background-color",
        "var(--light-background-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-primary",
        "var(--light-text-primary)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-secondary",
        "var(--light-text-secondary)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-muted",
        "var(--light-text-muted)",
      );
      document.documentElement.style.setProperty(
        "--selected-surface-color",
        "var(--light-surface-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-surface-elevated",
        "var(--light-surface-elevated)",
      );
      document.documentElement.style.setProperty(
        "--selected-border-color",
        "var(--light-border-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-border-subtle",
        "var(--light-border-subtle)",
      );
      document.documentElement.style.setProperty(
        "--selected-accent-color",
        "var(--light-accent-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-accent-hover",
        "var(--light-accent-hover)",
      );
      if (changeSource) {
        changeSource(
          "https://videos.pexels.com/video-files/6907162/6907162-hd_1080_1920_30fps.mp4",
        );
      }
    } else {
      document.documentElement.style.setProperty(
        "--selected-background-color",
        "var(--background-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-primary",
        "var(--text-primary)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-secondary",
        "var(--text-secondary)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-muted",
        "var(--text-muted)",
      );
      document.documentElement.style.setProperty(
        "--selected-surface-color",
        "var(--surface-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-surface-elevated",
        "var(--surface-elevated)",
      );
      document.documentElement.style.setProperty(
        "--selected-border-color",
        "var(--border-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-border-subtle",
        "var(--border-subtle)",
      );
      document.documentElement.style.setProperty(
        "--selected-accent-color",
        "var(--accent-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-accent-hover",
        "var(--accent-hover)",
      );
      if (changeSource) {
        changeSource(
          "https://videos.pexels.com/video-files/13936805/13936805-uhd_2560_1440_24fps.mp4",
        );
      }
    }
  };

  const handleToggleLang = () => {
    setLanguage(lang === "en" ? "fr" : "en");
    // @ts-ignore
    changeLang(lang === "en" ? "fr" : "en");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${size}`}>
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`header__container ${isMenuOpen && size === "small" ? "open" : size === "small" ? "close" : ""}`}>
        <a href="#home" className="header__logo">
          VS
        </a>
        
        <nav className="header__nav">
          <li className="header__items">
            <a className="header__items__link" href="#home">
              {getTranslation(lang, "home")}
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#projects">
              {getTranslation(lang, "projects")}
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#socials">
              {getTranslation(lang, "socials")}
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#calendar">
              {getTranslation(lang, "calendar")}
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#contact">
              {getTranslation(lang, "contact")}
            </a>
          </li>
          
          <div className="header__items__mode__group">
            <li className="header__items header__items__mode">
              <span className="header__items__label">
                {isCheckedMode
                  ? getTranslation(lang, "dark")
                  : getTranslation(lang, "light")}
              </span>
              <label className="header__items__toggle">
                <input
                  checked={isCheckedMode}
                  onChange={handleToggle}
                  type="checkbox"
                  className="header__items__toggle__switch"
                />
                <span className="header__items__toggle__slider"></span>
              </label>
            </li>
            <li className="header__items header__items__mode">
              <span className="header__items__label">
                {lang === "en" ? "EN" : "FR"}
              </span>
              <label className="header__items__toggle">
                <input
                  checked={lang === "en"}
                  onChange={handleToggleLang}
                  type="checkbox"
                  className="header__items__toggle__switch"
                />
                <span className="header__items__toggle__slider"></span>
              </label>
            </li>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
