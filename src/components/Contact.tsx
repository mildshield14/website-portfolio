import React from "react";
import "../scss/Contact.scss";
import getTranslation from "../getTranslation.ts";

type ContactProps = {
  size: any;
  lang: string;
};

const Contact: React.FC<ContactProps> = ({ size, lang }) => {
  return (
    <section id="contact" className={`contact ${size}`}>
      <div className="contact__container">
        <h2 className="page__title">
          {getTranslation(lang ? lang : "en", "contact")}
        </h2>
        
        {/* Contact info cards */}
        <div className="contact__info">
          <div className="contact__info__card">
            <div className="contact__info__card__icon">📧</div>
            <h3 className="contact__info__card__title">
              {getTranslation(lang ? lang : "en", "email")}
            </h3>
            <div className="contact__info__card__value">
              <a 
                href="mailto:vennilasooben1401@gmail.com" 
                className="contact__info__card__link"
              >
                vennilasooben1401@gmail.com
              </a>
            </div>
          </div>
          
          <div className="contact__info__card">
            <div className="contact__info__card__icon">📍</div>
            <h3 className="contact__info__card__title">
              {lang === "en" ? "Location" : "Localisation"}
            </h3>
            <div className="contact__info__card__value">
              Montréal, QC, Canada
            </div>
          </div>
          
          <div className="contact__info__card">
            <div className="contact__info__card__icon">⏰</div>
            <h3 className="contact__info__card__title">
              {lang === "en" ? "Response Time" : "Temps de réponse"}
            </h3>
            <div className="contact__info__card__value">
              {lang === "en" ? "Within 24 hours" : "Sous 24 heures"}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="contact__form">
          <h3 className="contact__form__title">
            {lang === "en" ? "Send me a message" : "Envoyez-moi un message"}
          </h3>
          <form
            action={`https://formspree.io/f/${import.meta.env.VITE_APP_FORM_KEY}`}
            method="POST"
            className="contact__form__grid"
          >
            <div className="contact__form__group" style={{ '--index': 0 } as React.CSSProperties}>
              <label className="contact__form__label" htmlFor="name">
                {getTranslation(lang ? lang : "en", "name")}
              </label>
              <input
                className="contact__form__input"
                type="text"
                id="name"
                name="name"
                placeholder={lang === "en" ? "Your name" : "Votre nom"}
                required
              />
            </div>

            <div className="contact__form__group" style={{ '--index': 1 } as React.CSSProperties}>
              <label className="contact__form__label" htmlFor="email">
                {getTranslation(lang ? lang : "en", "email")}
              </label>
              <input
                className="contact__form__input"
                type="email"
                id="email"
                name="email"
                placeholder={lang === "en" ? "your.email@example.com" : "votre.email@exemple.com"}
                required
              />
            </div>

            <div className="contact__form__group" style={{ '--index': 2 } as React.CSSProperties}>
              <label className="contact__form__label" htmlFor="subject">
                {lang === "en" ? "Subject" : "Sujet"}
              </label>
              <input
                className="contact__form__input"
                type="text"
                id="subject"
                name="subject"
                placeholder={lang === "en" ? "What's this about?" : "De quoi s'agit-il?"}
                required
              />
            </div>

            <div className="contact__form__group" style={{ '--index': 3 } as React.CSSProperties}>
              <label className="contact__form__label" htmlFor="message">
                {getTranslation(lang ? lang : "en", "message")}
              </label>
              <textarea
                className="contact__form__textarea"
                id="message"
                name="message"
                placeholder={lang === "en" ? "Tell me about your project or just say hello!" : "Parlez-moi de votre projet ou dites simplement bonjour!"}
                rows={6}
                required
              ></textarea>
            </div>

            <button
              className="contact__form__submit"
              type="submit"
            >
              {getTranslation(lang ? lang : "en", "send")}
            </button>
            
            <div id="form-status" className="contact__form__status"></div>
          </form>
        </div>
        
        {/* Resume section */}
        <div className="contact__resume">
          <h3 id="resume" className="contact__resume__title">
            {getTranslation(lang ? lang : "en", "resume")}
          </h3>
          <div className="contact__resume__container">
            <iframe 
              className="contact__resume__iframe"
              src={getTranslation(lang ? lang : "en", "link")}
              title="Resume"
              allow="autoplay"
            ></iframe>
            <a 
              href={getTranslation(lang ? lang : "en", "link")} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact__resume__download"
            >
              {lang === "en" ? "Download Resume" : "Télécharger le CV"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
