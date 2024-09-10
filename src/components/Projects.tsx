import React, {useState} from "react";
import "../scss/Projects.scss";
import {Project, projects} from "./projects";
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

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const showProjectDetails = (project: Project) => {
        setSelectedProject(project);
    };

    const hideProjectDetails = () => {
        // @ts-ignore
        setSelectedProject(null);
    };
  // @ts-ignore
    // @ts-ignore
    return (
    <section className={size.size}>
      <h2 id="projects" className="page__title">
        {" "}
        {getTranslation(lang ? lang : "en", "projects")}
      </h2>
      <Slider {...settings}>
        {projects.map((project: any) => (
          <div
            key={project.id}
            className="projects__items"
            onClick={() => showProjectDetails(project)}
          >
            <img
              className="projects__items__images"
              src={project.image}
              alt={project.title[lang]}
            />
            <h3 className="projects__items__titles">{project.title[lang]}</h3>
          </div>
        ))}
      </Slider>
      {selectedProject && (
        <div className="project-detail-overlay" onClick={hideProjectDetails}>
          <div
            className="project-detail-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={hideProjectDetails}>
              ×
            </button>
            <h2 className="project-detail-content__items project-detail-content__items-title">
              {selectedProject.title['lang']}
            </h2>
            <img
              className="projects__items__images"
              src={selectedProject.image}
              alt={selectedProject.title.lang}
            />
            <p className="project-detail-content__items">
              {selectedProject.description[lang]}
            </p>
            <p className="project-detail-content__items">
              <strong>{getTranslation(lang, "technologies")}</strong>: {" "}
              {selectedProject.technologies.join(", ")}
            </p>
            <p className="project-detail-content__items">
              <strong>{getTranslation(lang, "period")}</strong>: {" "}
              {selectedProject.period[lang]}
            </p>
            {selectedProject.pdf && (
              <a
                href={selectedProject.pdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </a>
            )}
            {selectedProject.video && (
              <video src={selectedProject.video} controls />
            )}
            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            )}

              <div className="project-detail-content__items project-detail-content__items-para">
                  {selectedProject.details[lang].map((detail: any, index: any) => (
                      <p className={"project-detail-para"} key={index}>{detail}</p>
                  ))}
              </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
