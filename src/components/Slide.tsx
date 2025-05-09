import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import VaraText from "./VaraText.tsx";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import getTranslation from "../getTranslation.ts";

const Slide = (lang: any) => {
  const languages = [
    { name: "JavaScript",   image: "https://skillicons.dev/icons?i=js" },
    { name: "TypeScript",   image: "https://skillicons.dev/icons?i=ts" },
    { name: "Python",       image: "https://skillicons.dev/icons?i=python" },
    { name: "Java",         image: "https://skillicons.dev/icons?i=java" },
    { name: "PHP",          image: "https://skillicons.dev/icons?i=php" },
    { name: "HTML5",        image: "https://skillicons.dev/icons?i=html" },
    { name: "CSS3",         image: "https://skillicons.dev/icons?i=css" },
    { name: "Sass",         image: "https://skillicons.dev/icons?i=sass" },
    { name: "LaTeX",        image: "https://skillicons.dev/icons?i=latex" },
    { name: "MySQL",        image: "https://skillicons.dev/icons?i=mysql" },
    { name: "PostgreSQL",   image: "https://skillicons.dev/icons?i=postgres" },
    { name: "MongoDB",      image: "https://skillicons.dev/icons?i=mongodb" },
  ];

  const frameworks = [
    { name: "React",        image: "https://skillicons.dev/icons?i=react" },
    { name: "Vue 3",        image: "https://skillicons.dev/icons?i=vue" },
    { name: "Nuxt.js",      image: "https://skillicons.dev/icons?i=nuxtjs" },
    { name: "Node.js",      image: "https://skillicons.dev/icons?i=nodejs" },
    { name: "Express",      image: "https://skillicons.dev/icons?i=express" },
    { name: "jQuery",       image: "https://skillicons.dev/icons?i=jquery" },
    { name: "Redux",        image: "https://skillicons.dev/icons?i=redux" },
    { name: "Tailwind", image: "https://skillicons.dev/icons?i=tailwind" },
    { name: "Vite",         image: "https://skillicons.dev/icons?i=vite" },
  ];

  const tools = [
    { name: "Docker",       image: "https://skillicons.dev/icons?i=docker" },
    { name: "Git",          image: "https://skillicons.dev/icons?i=git" },
    { name: "Linux",        image: "https://skillicons.dev/icons?i=linux" },
    { name: "VSCode",       image: "https://skillicons.dev/icons?i=vscode" },
    { name: "Notion",       image: "https://skillicons.dev/icons?i=notion" },
    { name: "Postman",      image: "https://skillicons.dev/icons?i=postman" },
  ];


  const internDescription = (
    <>
      <div className="slide">
        <h2 className={"homepage__title"}>
          {getTranslation(lang.lang, "experience")}
        </h2>
        <div className="slide__header">
          <h2>{getTranslation(lang.lang, "softwareIntern")}</h2>
          <span>
            {lang.lang === "en"
              ? `May 2024 - Aug 2024 at Bell Média`
              : `Mai 2024 - Août 2024 chez Bell Média`}
          </span>
        </div>
        <div className="slide__content">
          <p className="slide__content__para">
            {lang.lang === "en" ? (
              <span>
                Focused on dynamic web widgets using <strong>Vue3</strong> for
                various media platforms including{" "}
                <a href="https://www.tsn.ca/">TSN</a>,{" "}
                <a href="https://www.rds.ca/">RDS</a>, and more.
              </span>
            ) : (
              <span>
                Conception des widgets web dynamiques utilisant{" "}
                <strong>Vue3</strong> pour diverses plateformes médiatiques
                incluant <a href="https://www.tsn.ca/">TSN</a>,{" "}
                <a href="https://www.rds.ca/">RDS</a>, et plus encore.
              </span>
            )}
          </p>
          <p className="slide__content__para">
            {lang.lang === "en"
              ? `Implemented an intern ticket management tool to streamline the creation and tracking processes of JIRA tickets.`
              : `Mise en œuvre d'un outil de gestion des tickets interne pour simplifier les processus de création et de suivi des tickets JIRA.`}
          </p>
          <p className="slide__content__para">
            <strong>Tech Stack:</strong> Vue3, TypeScript, SCSS
          </p>
        </div>
        <div className="slide__logos">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgOMGr-aODk_f_zq8mRuxJl2UH1AmTy76_Sg&s"
            alt="Media Logos"
          />
        </div>
      </div>
    </>
  );

  const teachingAssistantDescription = (
    <>
      <div className="slide">
        <h2 className={"homepage__title"}>
          {getTranslation(lang.lang, "experience")}
        </h2>
        <div className="slide__header">
          <h2>{getTranslation(lang.lang, "ta")}</h2>
          <span>
            Jan 2024 - Jan 2025
          </span>
        </div>
        <div className="slide__content">
          <p className="slide__content__para">
            IFT1005 :{" "}
            {lang.lang === "en"
              ? "Web design and development"
              : " Design et développement web"}
          </p>
          <p className="slide__content__para">
            {lang.lang === "en" ? (
              <span>
                Taught <strong>HTML</strong>, <strong>CSS</strong>,{" "}
                <strong>JavaScript</strong>, and more, enhancing student
                understanding of web technologies.
              </span>
            ) : (
              <span>
                Enseignement de <strong>HTML</strong>, <strong>CSS</strong>,{" "}
                <strong>JavaScript</strong>, et plus, améliorant la
                compréhension des technologies web par les étudiants.
              </span>
            )}
          </p>
          <p className="slide__content__para">
            {lang.lang === "en"
              ? "Conducted live demonstrations and helped students set up their development environments."
              : "Réalisation de démonstrations en direct et aide aux étudiants à configurer leurs environnements de développement."}
          </p>
          <p className="slide__content__para">
            {lang.lang === "en"
              ? "Graded assignments, provided feedback, and responded to student inquiries via email and Discord."
              : "Correction des devoirs avec des retours constructifs, et réponse aux questions des étudiants par courriel et Discord."}
          </p>
        </div>
        <img
          className="slide__logo slide__logos__udem"
          src="https://www.umontreal.ca/public/www/images/millenium/logo-partenaires_UdeM.jpg"
          alt="Université de Montréal Logo"
        />
      </div>
    </>
  );

  const studentDescription = (
    <>
      <div className="slide">
        <h2 className={"homepage__title"}>
          {getTranslation(lang.lang, "education")}
        </h2>
        <div className="slide__header">
          <h2>
            {lang.lang === "en"
              ? `BSc in Computer Science`
              : `BSc en Informatique`}
          </h2>
          <span>Sep 2022 -  Dec 2024</span>
        </div>
        <div className="slide__content">
          <p className="slide__content__para">
            {lang.lang === "en" ? (
              <span>
                Focused on <strong>Software Engineering Practices</strong>,{" "}
                <strong>Software Development</strong>, <strong>AI</strong>,{" "}
                <strong>Networks</strong>, and <strong>Data Science</strong>.
              </span>
            ) : (
              <span>
                Concentration sur les{" "}
                <strong>pratiques d'ingénierie logicielle</strong>, le{" "}
                <strong>développement logiciel</strong>, l'
                <strong>intelligence artificielle</strong>, les{" "}
                <strong>réseaux</strong> et la{" "}
                <strong>science des données</strong>.
              </span>
            )}
          </p>
          <p className="slide__content__para">
            {lang.lang === "en"
              ? `Recipient of a scholarship based on school grades offered to international students valued at more than 30,000$.`
              : `Reçu une bourse pour étudiants internationaux sur niveau scolaire à hauteur de plus de 30000$.`}
          </p>
          {/*<p className="slide__content__para">*/}
          {/*  {lang.lang === "en"*/}
          {/*    ? `Credited projec: Calque.`*/}
          {/*    : `Projet crédité: Calque - Création de cartes multicouches qui offrent la possibilité de modéliser des étages ou d'abstraire des informations pour une visualisation plus complexe et organisée. `}*/}
          {/*  <br/>*/}
          {/*</p>*/}
        </div>
        <img
          className="slide__logo slide__logos__udem"
          src="https://www.umontreal.ca/public/www/images/millenium/logo-partenaires_UdeM.jpg"
          alt="Université de Montréal Logo"
        />
      </div>
    </>
  );

  const skills_slide = (array: { image: string; name: string }[]) => {
    return array.map((array) => (
      <div className={"homepage__slide__skills"}>
        <h3 className={"homepage__slide__skills__name"}>{array.name}</h3>
        <img
          className={"homepage__slide__skills__image"}
          src={array.image}
          alt={array.name}
        />
      </div>
    ));
  };

  // TODO: need to adapt to use css on navbar
  // TODO: basicall add css for points at th botto and the arrow left and right
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    },
  };

  // @ts-ignore
  return (
    <div id="home" className="homepage">
      <Slider {...settings}>
        <div className="homepage__container">
          <div className="homepage__background-animation"></div>

          <div className="homepage__intro-section">
            <div className="homepage__intro-section__description">
              <h1 className="homepage__intro-section__title">
                {lang.lang === "en" ? (
                  <span className="cool-name">
                    <span className="cool-name-intro">Hey, I'm{" "}</span>
                      <span className="cool-name__name">
                      <VaraText text="Vennila"  id="en-name"/>
                    </span>
                  </span>
                ) : (
                  <span className="cool-name">
                    Salut, c'est{" "}
                    <span className="cool-name__name">
                      <VaraText text="Vennila" id="fr-name" />
                    </span>
                  </span>
                )}
              </h1>

              <p className="homepage__intro-section__content fade-slide-in">
                {lang.lang === "en"
                  ? `I'm a fullstack developer specialized in frontend technologies.`
                  : `Je suis une développeuse fullstack spécialisée en frontend.`}
              </p>

              <p className="homepage__intro-section__content fade-slide-in delay-1">
                {lang.lang === "en"
                  ? `I'm currently looking for new grad opportunities for 2025.`
                  : `Je suis actuellement à la recherche d'opportunités pour nouveaux diplômés 2025.`}
              </p>

              <a href="#contact" className="homepage__cta-button">
                {" "}
                {lang.lang === "en" ? `Let's Connect!` : `Connectons-nous!`}
              </a>
            </div>
          </div>
        </div>

        <div className="homepage__container">
          <div className="homepage__intro-section">
            <div className={"homepage__slide"}>
              <h2 className={"homepage__title"}>
                {getTranslation(lang.lang, "techSkills")}
              </h2>
              <span className={"homepage__slide__skills__title"}>
                {getTranslation(lang.lang, "languages")}
              </span>
              <div className={"homepage__slide__container"}>
                {skills_slide(languages)}
              </div>
              <span className={"homepage__slide__skills__title"}>
                Frameworks
              </span>
              <div className={"homepage__slide__container"}>
                {skills_slide(frameworks)}
              </div>
              <span className={"homepage__slide__skills__title"}>
                {getTranslation(lang.lang, "tools")}
              </span>
              <div className={"homepage__slide__container"}>
                {skills_slide(tools)}
              </div>
            </div>
          </div>
        </div>
        <div className="homepage__container">
          <div className="homepage__intro-section">{internDescription}</div>
        </div>
        <div className="homepage__container">
          <div className="homepage__intro-section">
            {teachingAssistantDescription}
          </div>
        </div>
        <div className="homepage__container">
          <div className="homepage__intro-section">{studentDescription}</div>
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
