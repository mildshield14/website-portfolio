import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../scss/Projects.scss";
import { Project, projects } from "./projects";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const showProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const hideProjectDetails = () => {
    setSelectedProject(null);
  };

  // Use grid layout for larger screens, slider for mobile
  const shouldUseSlider = size === "small";
  
  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    },
  };

  const overlay = selectedProject ? (
    <div className="project-detail-overlay" onClick={hideProjectDetails}>
      <div
        className="project-detail-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-detail-content__header">
          <h2 className="project-detail-content__title">
            {selectedProject.title[lang]}
          </h2>
          <button className="close-button" onClick={hideProjectDetails}>
            ×
          </button>
        </div>
        
        <img
          className="project-detail-content__image"
          src={selectedProject.image}
          alt={selectedProject.title[lang]}
        />
        
        <p className="project-detail-content__description">
          {selectedProject.description[lang]}
        </p>
        
        <div className="project-detail-content__meta">
          <div className="project-detail-content__meta__item">
            <div className="project-detail-content__meta__item__label">
              {getTranslation(lang, "technologies")}
            </div>
            <div className="project-detail-content__tech">
              {selectedProject.technologies.map((tech, index) => (
                <span key={index} className="project-detail-content__tech__tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="project-detail-content__meta__item">
            <div className="project-detail-content__meta__item__label">
              {getTranslation(lang, "period")}
            </div>
            <div className="project-detail-content__meta__item__value">
              {selectedProject.period[lang]}
            </div>
          </div>
        </div>
        
        <div className="project-detail-content__details">
          <h3 className="project-detail-content__details__title">
            {lang === "en" ? "Key Features" : "Fonctionnalités clés"}
          </h3>
          <ul className="project-detail-content__details__list">
            {selectedProject.details[lang].map((detail: any, index: any) => (
              <li key={index} className="project-detail-content__details__list__item">
                {detail}
              </li>
            ))}
          </ul>
        </div>
        
        {selectedProject.pdf && (
          <div className="project-detail-content__links">
            {selectedProject.pdf && (
              <a
                href={selectedProject.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-content__links__link"
              >
                {lang === "en" ? "View PDF" : "Voir PDF"}
              </a>
            )}
            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail-content__links__link"
              >
                {lang === "en" ? "Visit Website" : "Visiter le site"}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  ) : null;

  const ProjectCard = ({ project }: { project: any }) => (
    <div className="projects__card" onClick={() => showProjectDetails(project)}>
      <div className="projects__card__overlay">
        <div className="projects__card__overlay__text">
          {lang === "en" ? "View Details" : "Voir les détails"}
        </div>
      </div>
      <img
        className="projects__card__image"
        src={project.image}
        alt={project.title[lang]}
      />
      <div className="projects__card__content">
        <h3 className="projects__card__title">{project.title[lang]}</h3>
        <p className="projects__card__description">
          {project.description[lang]}
        </p>
        <div className="projects__card__meta">
          <div className="projects__card__tech">
            {project.technologies.slice(0, 3).map((tech: string, index: number) => (
              <span key={index} className="projects__card__tech__tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="projects__card__tech__tag">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          <div className="projects__card__period">
            {project.period[lang]}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className={`projects ${size}`}>
      <div className="projects__container">
        <h2 className="page__title">
          {getTranslation(lang ? lang : "en", "projects")}
        </h2>
        
        {shouldUseSlider ? (
          <Slider {...settings}>
            {projects.map((project: any) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="projects__grid">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Render the overlay in a portal, outside the regular component tree */}
      {selectedProject && ReactDOM.createPortal(overlay, document.body)}
    </section>
  );
};

export default Projects;
