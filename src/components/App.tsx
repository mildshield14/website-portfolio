import {useCallback, useEffect, useRef, useState} from "react";
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

    const useElementSize = (ref: any, breakpoints:any) => {
        const [size, setSize] = useState('medium'); // Default size based on your specifications

        const calculateSize = useCallback(() => {
            if (ref.current) {
                const width = ref.current.offsetWidth;
                for (const key in breakpoints) {
                    const { min, max } = breakpoints[key];
                    if (width >= min && width < max) {
                        setSize(key);
                        return;
                    }
                }
            }
        }, [ref, breakpoints]);

        useEffect(() => {
            calculateSize();

            // Set up a ResizeObserver to re-calculate when size changes
            const resizeObserver = new ResizeObserver(calculateSize);
            if (ref.current) {
                resizeObserver.observe(ref.current);
            }

            // Cleanup function to disconnect observer
            return () => {
                resizeObserver.disconnect();
            };
        }, [ref, calculateSize]);

        return size;
    };

    const size = useElementSize(ref, breakpoints);
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
      <HomePage size={size} lang={lang} />
      <Projects size={size} lang={lang} />
      <Socials size={size} lang={lang} />
      <Contact size={size} lang={lang} />
      <footer>
        <div>Vennila Sooben &copy;2024</div>
        <div>Made with React, Typescript, SCSS</div>
      </footer>
    </div>
  );
}

export default App;
