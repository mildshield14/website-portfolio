import React from "react";
import "../scss/HomePage.scss";
import Slide from "./Slide.tsx";

type HomePageProps = {
    size: any;
};

const HomePage: React.FC<HomePageProps> = ({ size }) => {
  return (
    <section className={size.size}>
      <Slide />
    </section>
  );
};

export default HomePage;
