import React from "react";
import "../scss/HomePage.scss";
import Slide from "./Slide.tsx";

type HomePageProps = {
  size: string;
  lang: any;
};

const HomePage: React.FC<HomePageProps> = ({ size, lang }) => {
  return (
    <section className={size}>
      <Slide lang={lang} />
    </section>
  );
};

export default HomePage;
