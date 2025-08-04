import React from "react";
import "../scss/HomePage.scss";
import Slide from "./Slide.tsx";
import getTranslation from "../getTranslation.ts";

type HomePageProps = {
  size: any;
  lang: any;
};

const HomePage: React.FC<HomePageProps> = ({ size, lang }) => {
  return (
    <section id="home" className={`homepage ${size}`}>
      <div className="homepage__container">
        <div className="homepage__hero">
          <div className="homepage__hero__content">
            <div className="homepage__greeting">
              {lang === "en" ? "Hello, I'm" : "Salut, c'est"}
            </div>
            <h1 className="homepage__title">
              <span className="homepage__title__name">Vennila Sooben</span>
            </h1>
            <p className="homepage__subtitle">
              {lang === "en"
                ? "Full-stack developer specialized in frontend technologies, currently pursuing my Master's in Computer Science at UdeM."
                : "Développeuse full-stack spécialisée en technologies frontend, actuellement à la maîtrise en informatique à l'UdeM."}
            </p>
            <div className="homepage__cta">
              <a href="#contact" className="homepage__cta__primary">
                {lang === "en" ? "Let's Connect" : "Connectons-nous"}
              </a>
              <a href="#projects" className="homepage__cta__secondary">
                {lang === "en" ? "View My Work" : "Voir mes projets"}
              </a>
            </div>
            <div className="homepage__stats">
              <div className="homepage__stats__item">
                <span className="homepage__stats__item__number">15+</span>
                <span className="homepage__stats__item__label">
                  {getTranslation(lang, "projects")}
                </span>
              </div>
              <div className="homepage__stats__item">
                <span className="homepage__stats__item__number">2+</span>
                <span className="homepage__stats__item__label">
                  {lang === "en" ? "Years Experience" : "Années d'expérience"}
                </span>
              </div>
              <div className="homepage__stats__item">
                <span className="homepage__stats__item__number">10+</span>
                <span className="homepage__stats__item__label">
                  {getTranslation(lang, "technologies")}
                </span>
              </div>
            </div>
          </div>
          <div className="homepage__hero__visual">
            <div className="homepage__avatar">
              <div className="homepage__avatar__container">
                <img 
                  src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Vennila Sooben" 
                  className="homepage__avatar__image"
                />
                <div className="homepage__avatar__decoration homepage__avatar__decoration--1"></div>
                <div className="homepage__avatar__decoration homepage__avatar__decoration--2"></div>
                <div className="homepage__avatar__decoration homepage__avatar__decoration--3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <Slide lang={lang} />
      </div>
    </section>
  );
};

export default HomePage;
