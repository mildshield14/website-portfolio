import React from "react";
import "../scss/Socials.scss";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import getTranslation from "../getTranslation.ts";

type SocialsProps = {
  size: any;
  lang: string
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
      <section className={size.size}>
          <h2 id="socials" className="page__title"> {getTranslation(lang ? lang : "en", "socials")}
          </h2>
          <ul className="socials__container">
              {socials.map((social, index) => (
                  <li className="socials__items" key={index}>
                      <a className="socials__items__links" href={social.url}>
                          <img
                              className="socials__items__images"
                              src={social.image}
                              alt={social.title}
                          />
                          <h3 className="socials__items__titles">{social.title}</h3>
                      </a>
                  </li>
              ))}
          </ul>
      </section>
  );
};

export default Socials;
