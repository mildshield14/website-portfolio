import React from "react";
import "../scss/Projects.scss";
import { projects } from "./projects";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import getTranslation from "../getTranslation.ts";

type ProjectsProps = {
    size: any;
    lang: any;
};

const Projects: React.FC<ProjectsProps> = ({ size, lang }) => {

    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: size==="small" ? 2 : size==="medium" ? 4 : size==="large" ? 6 : 8,
        slidesToScroll: 3,
        appendDots: (dots:any) => {
            return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
        },
    };
  return (
    <section className={size.size}>
      <h2 id="projects" className="page__title"> {getTranslation(lang ? lang : "en", "projects")}</h2>
          <Slider {...settings}>
              {projects.map((project: any, index) => (
                  <div key={index} className="projects__items">
                      <img
                          className="projects__items__images"
                          src={project.image}
                          alt={project.title[lang]}
                      />
                      <h3 className="projects__items__titles">{project.title[lang]}</h3>
                  </div>
              ))}
          </Slider>
    </section>
  );
};

export default Projects;
