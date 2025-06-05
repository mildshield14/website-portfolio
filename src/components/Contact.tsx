import React from "react";
import "../scss/Contact.scss";
import getTranslation from "../getTranslation.ts";

type ContactProps = {
  size: string;
  lang: string;
};

const Contact: React.FC<ContactProps> = ({ size, lang }) => {
  return (
      <section className={size}>
          <h2 id="contact" className="page__title">
              {getTranslation(lang ? lang : "en", "contact")}
          </h2>
          <div className="contact__form__container">
              <form
                  className="contact__form"
                  action={`https://formspree.io/f/${import.meta.env.VITE_APP_FORM_KEY}`}
                  method="POST"
              >
                  <label className="contact__form__label" htmlFor="name">
                      {getTranslation(lang ? lang : "en", "name")}:
                  </label>
                  <input
                      className="contact__form__input"
                      type="text"
                      id="name"
                      name="name"
                      required
                  />

                  <label className="contact__form__label" htmlFor="email">
                      {getTranslation(lang ? lang : "en", "email")}:
                  </label>
                  <input
                      className="contact__form__input"
                      type="email"
                      id="email"
                      name="email"
                      required
                  />

                  <label className="contact__form__label" htmlFor="message">
                      {getTranslation(lang ? lang : "en", "message")}:
                  </label>
                  <textarea
                      className="contact__form__input"
                      id="message"
                      name="message"
                      rows={6}
                      required
                  ></textarea>

                  <input
                      className="contact__form__send contact__form__input"
                      type="submit"
                      value={getTranslation(lang ? lang : "en", "send")}
                  />
                  <p id="form-status"></p>
              </form>
          </div>
          <h2 id="resume" className="page__title">
              {getTranslation(lang ? lang : "en", "resume")}
          </h2>
          <iframe className="contact__form__resume"
                  src= {getTranslation(lang ? lang : "en", "link")}
                  width="640"
                  height="480"
                  allow="autoplay"
          ></iframe>
      </section>
  );
};

export default Contact;
