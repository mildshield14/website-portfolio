import { useRef } from "react";
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

    return (
        <div className={size} ref={ref}>
            <Header />
            <HomePage size={size}/>
            <Projects size={size}/>
            <Socials size={size}/>
            <Contact size={size}/>
        </div>
    );
}

export default App;