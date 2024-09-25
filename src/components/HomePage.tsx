import React from "react";
import "../scss/HomePage.scss";
import Slide from "./Slide.tsx";

type HomePageProps = {
  size: any;
  lang: any;
};

const HomePage: React.FC<HomePageProps> = ({ size, lang }) => {
  return (
    <section className={size.size}>
      <Slide lang={lang} />
    </section>
  );
};

export default HomePage;
