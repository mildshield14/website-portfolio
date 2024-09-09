import React from "react";
import "../scss/Contact.scss";

type ContactProps = {
  size: any;
};

const Contact: React.FC<ContactProps> = ({ size }) => {
  return (
    <section className={size.size}>
      <h2 id="contact" className="page__title">
        {" "}
        Contact{" "}
      </h2>
      <div className="contact__form__container">
        <form
          className="contact__form"
          action={`https://formspree.io/f/${import.meta.env.VITE_APP_FORM_KEY}`}
          method="POST"
        >
          <label className="contact__form__label" htmlFor="name">
            Name:
          </label>
          <input
            className="contact__form__input"
            type="text"
            id="name"
            name="name"
            required
          />

          <label className="contact__form__label" htmlFor="email">
            Email:
          </label>
          <input
            className="contact__form__input"
            type="email"
            id="email"
            name="email"
            required
          />

          <label className="contact__form__label" htmlFor="message">
            Message:
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
            value="Send"
          />
          <p id="form-status"></p>
        </form>
      </div>
      <h2 id="resume" className="page__title">
        {" "}
        Resume{" "}
      </h2>
      <iframe
        className="contact__form__resume"
        src="https://drive.google.com/file/d/1uNkLtCkvEB6hdj_iJltY78x_Ig4k9olO/preview"
        width="640"
        height="500"
        allow="autoplay"
      ></iframe>
    </section>
  );
};

export default Contact;
