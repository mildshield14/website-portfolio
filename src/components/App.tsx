import { useEffect, useRef, useState } from "react";
import useElementSize from "../hook/useElementSize.tsx";
import Header from "./Header.tsx";
import Projects from "./Projects.tsx";
import "../scss/App.scss";
import HomePage from "./HomePage.tsx";
import Contact from "./Contact.tsx";
import Socials from "./Socials.tsx";

function App() {
  const ref = useRef(null);

  // Define breakpoints
  const breakpoints = {
    small: { min: 300, max: 599 },
    medium: { min: 600, max: 899 },
    large: { min: 900, max: 1399 },
    extra: { min: 1400, max: Infinity },
  };

  const size = useElementSize(ref, breakpoints) || "medium";
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(
      "https://videos.pexels.com/video-files/13936805/13936805-uhd_2560_1440_24fps.mp4",
  );

  // Function to update the video source
  const changeVideoSource = (newSrc: any) => {
    setVideoSrc(newSrc);
  };

  const [lang, setLang] = useState("en");

  // Function to update the video source
  const changeLang = (langReceived: any) => {
    setLang(langReceived);
  };

  useEffect(() => {
    if (videoRef.current) {
      // @ts-ignore
      videoRef.current.load();
      if (size === "small") {
        // @ts-ignore
        videoRef.current.pause();
      }
    }
  }, [videoSrc]);

  // @ts-ignore
  const Section = ({ children }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible(true); // Trigger animation when entering
              } else {
                setIsVisible(false); // Reset when leaving viewport
              }
            });
          },
          { threshold: 0.2 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`slide-in ${isVisible ? "visible" : ""}`}
        >
          {children}
        </div>
    );
  };

  return (
      <div className={size} ref={ref}>
        <video
            id="background-video"
            ref={videoRef}
            autoPlay
            loop
            muted
            onError={(e) => console.log("Video Error:", e)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <Header
            size={size}
            changeSource={changeVideoSource}
            changeLang={changeLang}
        />
        <Section>
          <HomePage size={size} lang={lang} />
        </Section>
        <Section>
          <Projects size={size} lang={lang} />
        </Section>
        <Section>
          <Socials size={size} lang={lang} />
        </Section>
        <Section>
          <Contact size={size} lang={lang} />
        </Section>

        <footer>
          <div>Vennila Sooben &copy;2024</div>
          <div>Made with React, Typescript, SCSS</div>
        </footer>
      </div>
  );
}

export default App;
