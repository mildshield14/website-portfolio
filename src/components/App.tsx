import { useEffect, useRef, useState } from "react";
import Header from "./Header.tsx";
import Projects from "./Projects.tsx";
import "../scss/App.scss";
import useElementSize from "../hook/useElementSize.tsx";
import HomePage from "./HomePage.tsx";
import Contact from "./Contact.tsx";
import Socials from "./Socials.tsx";

function App() {
  const ref = useRef(null);

  // Define breakpoints
  const breakpoints = {
    small: { min: 300, max: 499 },
    medium: { min: 500, max: 899 },
    large: { min: 900, max: 1399 },
    extra: { min: 1400, max: Infinity },
  };

  const size: string = useElementSize(ref, breakpoints) || "small";
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(
    "https://videos.pexels.com/video-files/13936805/13936805-uhd_2560_1440_24fps.mp4",
  );

  // Function to update the video source
  const changeVideoSource = (newSrc: any) => {
      setVideoSrc(newSrc);
  };

  useEffect(() => {
    if (videoRef.current) {
      // @ts-ignore
        videoRef.current.load();
    }
  }, [videoSrc]);

  return (
      <div className={size} ref={ref}>
          <video id="background-video" ref={videoRef} autoPlay loop muted
                 onError={(e) => console.log('Video Error:', e)}>
              <source src={videoSrc} type="video/mp4"/>
          </video>

          <Header changeSource={changeVideoSource}/>
          <HomePage size={size}/>
          <Projects size={size}/>
          <Socials size={size}/>
          <Contact size={size}/>
      </div>
  );
}

export default App;
