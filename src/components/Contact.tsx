import React from "react";
import "../scss/Contact.scss";

type ContactProps = {
  size: any;
};

const Contact: React.FC<ContactProps> = ({ size }) => {
  return (
      <section className={size.size}>
          <h2 id="contact" className="page__title"> Contact </h2>
          <form className="contact__form" action={`https://formspree.io/f/${import.meta.env.VITE_APP_FORM_KEY}`} method="POST">
              <label className="contact__form__label" htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required/>

              <label className="contact__form__label" htmlForgit add="email">Email:</label>
              <input type="email" id="email" name="email" required/>

              <label className="contact__form__label" htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={6} required></textarea>

              <input className="contact__form__send" type="submit" value="Send"/>
              <p id="form-status"></p>
          </form>
      </section>
  );
};

export default Contact;
