import React from 'react';
import '../scss/Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav>
                <ul className="header__container">
                    <li className="header__items"><a className="header__items__link" href="#home">Home</a></li>
                    <li className="header__items"><a className="header__items__link" href="#about">About</a></li>
                    <li className="header__items"><a className="header__items__link" href="#projects">Projects</a></li>
                    <li className="header__items"><a className="header__items__link" href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
