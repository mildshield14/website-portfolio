import React from "react";
import "../scss/Socials.scss";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import getTranslation from "../getTranslation.ts";

type SocialsProps = {
  size: any;
  lang: string;
};

type Socials = {
  title: string;
  image: string;
  url: string;
};

export const socials: Socials[] = [
  {
    title: "GitHub",
    image: github,
    url: "https://github.com/mildshield14",
  },
  {
    title: "LinkedIn",
    image: linkedin,
    url: "https://www.linkedin.com/in/vennilasooben/",
  },
];

const Socials: React.FC<SocialsProps> = ({ size, lang }) => {
  return (
    <section id="socials" className={`socials ${size}`}>
      <div className="socials__container">
        <h2 className="page__title">
          {getTranslation(lang ? lang : "en", "socials")}
        </h2>
        
        <div className="socials__grid">
          {socials.map((social, index) => (
            <div 
              key={index} 
              className={`socials__card socials__card--${social.title.toLowerCase()}`}
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="socials__card__icon">
                <img src={social.image} alt={social.title} />
              </div>
              <h3 className="socials__card__title">{social.title}</h3>
              <p className="socials__card__description">
                {social.title === "GitHub" 
                  ? (lang === "en" 
                      ? "Check out my code repositories and open source contributions" 
                      : "Découvrez mes dépôts de code et contributions open source")
                  : (lang === "en"
                      ? "Connect with me professionally and see my career journey"
                      : "Connectez-vous avec moi professionnellement et suivez mon parcours")
                }
              </p>
              <div className="socials__card__stats">
                <div className="socials__card__stats__item">
                  <span className="socials__card__stats__item__number">
                    {social.title === "GitHub" ? "15+" : "200+"}
                  </span>
                  <span className="socials__card__stats__item__label">
                    {social.title === "GitHub" 
                      ? (lang === "en" ? "Repos" : "Dépôts")
                      : (lang === "en" ? "Connections" : "Connexions")
                    }
                  </span>
                </div>
                <div className="socials__card__stats__item">
                  <span className="socials__card__stats__item__number">
                    {social.title === "GitHub" ? "5+" : "50+"}
                  </span>
                  <span className="socials__card__stats__item__label">
                    {social.title === "GitHub" 
                      ? (lang === "en" ? "Languages" : "Langages")
                      : (lang === "en" ? "Posts" : "Publications")
                    }
                  </span>
                </div>
              </div>
              <a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="socials__card__button"
              >
                {lang === "en" ? "Visit Profile" : "Visiter le profil"}
              </a>
            </div>
          ))}
        </div>
        
        <div className="socials__connect">
          <h3 className="socials__connect__title">
            {lang === "en" ? "Let's Connect!" : "Connectons-nous!"}
          </h3>
          <p className="socials__connect__description">
            {lang === "en" 
              ? "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and development."
              : "Je suis toujours ouvert à discuter de nouvelles opportunités, collaborations, ou simplement échanger sur la technologie et le développement."
            }
          </p>
          <div className="socials__connect__buttons">
            <a href="#contact" className="socials__connect__button socials__connect__button--primary">
              {lang === "en" ? "Get In Touch" : "Contactez-moi"}
            </a>
            <a href="#calendar" className="socials__connect__button socials__connect__button--secondary">
              {lang === "en" ? "Schedule a Call" : "Planifier un appel"}
            </a>
          </div>
        </div>
        
        {/* Floating decorations */}
        <div className="socials__decoration socials__decoration--1"></div>
        <div className="socials__decoration socials__decoration--2"></div>
        <div className="socials__decoration socials__decoration--3"></div>
      </div>
    </section>
  );
};

export default Socials;
