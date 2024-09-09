import React, { useState } from "react";
import "../scss/Header.scss";

const Header: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true); // Default checked state

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      document.documentElement.style.setProperty('--selected-background-color', 'var(--light-background-color)');
      document.documentElement.style.setProperty('--selected-text-color', 'var(--light--text-color)');
      document.documentElement.style.setProperty('--selected-secondary-color', 'var(--light-secondary-color)');
    } else {
      document.documentElement.style.setProperty('--selected-background-color', 'var(--background-color)');
      document.documentElement.style.setProperty('--selected-text-color', 'var(--text-color)');
      document.documentElement.style.setProperty('--selected-secondary-color', 'var(--secondary-color)');
    }
  };

  return (
    <header className="header">
      <nav>
        <ul className="header__container">
          <li className="header__items">
            <a className="header__items__link" href="#home">
              Home
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#projects">
              Projects
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#socials">
              Socials
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#contact">
              Contact
            </a>
          </li>
          <li className="header__items">
            <a className="header__items__link" href="#resume">
              Resume
            </a>
          </li>
          <li className="header__items">
            <label className="header__items__toggle">
              <input
                  checked={isChecked}
                  onChange={handleToggle}
                  type="checkbox"
                  className="header__items__toggle__switch"
              />
              <span className="header__items__toggle__slider"></span>
            </label>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
