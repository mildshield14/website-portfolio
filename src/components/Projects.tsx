import React, { useRef } from "react";
import "../scss/Projects.scss";
import { projects } from "./projects";

type ProjectsProps = {
    size: any;
};

const Projects: React.FC<ProjectsProps> = ({ size }) => {
  const sliderRef = useRef<HTMLUListElement>(null);
  const scrollAmount = 100;

  return (
    <section className={size.size}>
      <h2 id="projects" className="page__title"> Projects</h2>
      <ul className="projects__container" ref={sliderRef}>
        <button
          className="nav-btn"
          onClick={() => {
            const container = sliderRef.current;
            if (container) {
              container.scrollLeft -= scrollAmount; // Scroll left
            }
          }}
        >
          «
        </button>
        {projects.map((project, index) => (
          <li className="projects__items" key={index}>
            <img
              className="projects__items__images"
              src={project.image}
              alt={project.title}
            />
            <h3 className="projects__items__titles">{project.title}</h3>
          </li>
        ))}
        <button
          className="nav-btn"
          onClick={() => {
            const container = sliderRef.current;
            if (container) {
              container.scrollLeft += scrollAmount; // Scroll right
            }
          }}
        >
          »
        </button>
      </ul>
    </section>
  );
};

export default Projects;
