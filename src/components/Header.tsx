import React, { useState } from "react";
import "../scss/Header.scss";
import getTranslation from "../getTranslation.ts";

// @ts-ignore
type HeaderProps = {
  changeLang?: (lang: any) => void;
  changeSource?: (newSrc: any) => void;
  size: any;
};

const Header: React.FC<HeaderProps> = ({
  size,
  changeSource,
  changeLang
}) => {
  const [isCheckedMode, setIsCheckedMode] = useState(true); // Default checked state
  const [lang, setLanguage] = useState("en");

  const handleToggle = () => {
    setIsCheckedMode(!isCheckedMode);
    if (isCheckedMode) {
      document.documentElement.style.setProperty(
        "--selected-background-color",
        "var(--light-background-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-text-color",
        "var(--light--text-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-secondary-color",
        "var(--light--secondary-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-button-color",
        "var(--light--button-color)",
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
        "--selected-text-color",
        "var(--text-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-secondary-color",
        "var(--secondary-color)",
      );
      document.documentElement.style.setProperty(
        "--selected-button-color",
        "var(--button-color)",
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={size}>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav>
        <ul
          className={`header__container ${isMenuOpen && size === "small" ? "open" : size === "small" ? "close" : ""}`}
        >
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
            <a className="header__items__link" href="#contact">
              {getTranslation(lang, "contact")}
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#resume">
              {getTranslation(lang, "resume")}
            </a>
          </li>
          <div className="header__items__mode__group">
            <li className="header__items header__items__mode">
            <span className="header__items__label">
              {" "}
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
            <li className={`header__items header__items__mode ${isCheckedMode ? 'lang-dark' : 'lang'}`}>
            <span className="header__items__label">
              {lang === "en" ? "EN" : "FR"}{" "}
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

        </ul>
      </nav>
    </header>
  );
};

export default Header;
