import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";

const Slide = () => {
  const languages = [
    {
      name: "Typescript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    },
    {
      name: "Javascript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    },
    {
      name: "Java",
      image: "https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg",
    },
    {
      name: "Python",
      image:
        "https://banner2.cleanpng.com/20190623/yp/kisspng-python-computer-icons-programming-language-executa-1713885634631.webp",
    },
    {
      name: "C",
      image: "https://banner2.cleanpng.com/20171217/033/av2bv0zlf.webp",
    },
    {
      name: "SCSS",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ803r_FTGrMlWpKJqOWmQgwv0BkQaDWy8q1Q&s",
    },
    {
      name: "VB.NET",
      image:
        "https://deepinthecode.com/wp-content/uploads/2012/08/visual-basic-net.jpg",
    },
    {
      name: "MySQL",
      image: "https://banner2.cleanpng.com/20180614/bgj/aa7ffc9id.webp",
    },
    {
      name: "PostgreSQL",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    },
  ];

  const frameworks = [
    {
      name: "React",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOxiFZo8hp7oqoftdM8UCkftr2ZDLY0C25LA&s",
    },
    {
      name: "Vue3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQDzc6Oa8RidACamYSovP7GobW1G4-RBzUw&s",
    },
  ];

  const tools = [
    {
      name: "Figma",
      image:
        "https://w7.pngwing.com/pngs/54/524/png-transparent-figma-app-logo-tech-companies.png",
    },
    {
      name: "Github",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5i4JeVcOzQvFkVuMlN7RM62s298ar3Qv_vw&s",
    },
    {
      name: "Gitlab",
      image: "https://banner2.cleanpng.com/20180713/hfv/aawyt2x70.webp",
    },
    {
      name: "Jira",
      image: "https://banner2.cleanpng.com/20180526/lbx/avqyu5lq4.webp",
    },
    {
      name: "Bitbucket",
      image:
        "https://w7.pngwing.com/pngs/404/31/png-transparent-bitbucket-icon-hd-logo.png",
    },
    {
      name: "Miro",
      image:
        "https://e7.pngegg.com/pngimages/441/29/png-clipart-miro-logo-landscape-tech-companies.png",
    },
  ];

  const internDescription = (
    <>
      <div className="slide">
        <h2 className={"homepage__title"}>Experience</h2>
        <div className="slide__header">
          <h2>Software Development Internship</h2>
          <span>May 2024 - Aug 2024 at Bell Média</span>
        </div>
        <div className="slide__content">
          <p className="slide__content__para">
            Focused on dynamic web widgets using <strong>Vue3</strong> for various media
            platforms including <a href="https://www.tsn.ca/">TSN</a>,{" "}
            <a href="https://www.rds.ca/">RDS</a>, and more.
          </p>
          <p className="slide__content__para">
            Contributed to tools enhancing project workflows and data
            visualization, significantly improving internal operations.
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
        <h2 className={"homepage__title"}>Experience</h2>
        <div className="slide__header">
          <h2>Teaching Assistant</h2>
          <span>Jan 2024 - Present at UdeM</span>
        </div>
        <div className="slide__content">
          <p className="slide__content__para">
            Taught <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, and more, enhancing student
            understanding of web technologies.
          </p>
          <p className="slide__content__para">
            Conducted live demonstrations and helped students set up their
            development environments.
          </p>
          <p className="slide__content__para">
            Graded assignments, provided feedback, and responded to student
            inquiries via email and Discord.
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
          <h2 className={"homepage__title"}>Education</h2>
          <div className="slide__header">
            <h2>BSc in Computer Science</h2>
            <span>Sep 2022 - Present at UdeM (expected Dec 2024)</span>
          </div>
          <div className="slide__content">
            <p className="slide__content__para">
              Focused on <strong>Software Engineering Practices</strong>, <strong>Software Development</strong>, <strong>AI</strong>, <strong>Networks</strong> and <strong>Data Science</strong>.
            </p>
            <p className="slide__content__para">
              Recipient of a scholarship offered to international students valued at more than 30,000$.
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
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots:any) => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    },
  };

  // @ts-ignore
  return (
    <div id="home" className="homepage">
      <Slider {...settings}>
        <div className="homepage__container">
          <div className="homepage__intro-section">
            {/*<div className="homepage__animation-block">*/}
            {/*</div>*/}
            <div className="homepage__intro-section__description">
              <h1 className="homepage__intro-section__title">
                Hey, I'm Vennila!
              </h1>
              <p className="homepage__intro-section__content">
                I'm a fullstack developer specialised in Frontend technologies.
              </p>

              <p className="homepage__intro-section__content">
                I'm currently looking for new grad opportunities for 2025.
              </p>
            </div>
            <div className="slideBanner__container">
              <div className="slideBanner"></div>
            </div>

            {/*<div className="homepage__animation-block">*/}
            {/*</div>*/}
          </div>
        </div>
        <div className="homepage__container">
          <div className="homepage__intro-section">
            <div className={"homepage__slide"}>
              <h2 className={"homepage__title"}>Technical Skills</h2>
              <span className={"homepage__slide__skills__title"}>Languages</span>
              <div className={"homepage__slide__container"}>
                {skills_slide(languages)}
              </div>
              <span className={"homepage__slide__skills__title"}>Frameworks</span>
              <div className={"homepage__slide__container"}>
                {skills_slide(frameworks)}
              </div>
              <span className={"homepage__slide__skills__title"}>Tools</span>
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
          <div className="homepage__intro-section">
            {studentDescription}
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
