import React from "react";
import "../scss/HomePage.scss";
import {Breakpoint} from "./types.ts";
import Slide from "./Slide.tsx";

let HomePage: React.FC;

HomePage = (size: Breakpoint) => {
  return (
    <section className={size.size}>
      <Slide />
    </section>
  );
};

export default HomePage;
