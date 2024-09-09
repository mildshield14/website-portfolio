import weather from "../assets/weather.webp"
import weather_email from "../assets/weather_email.webp"
import robots from "../assets/robots.webp"
import pantry from "../assets/pantry.webp"
import course from "../assets/course.webp"
import chainon from "../assets/chainon.webp"
import internship from "../assets/internship.webp"

type Project = {
    title: string;
    image: string;
    technologies: string[];
    description: string;
    period: string;
    url?:string;
    details: string[];
};

export const projects: Project[] = [
    {
        title: "Internship Projects",
        image: weather,
        technologies: ["Vue3", "TypeScript", "SCSS", "JIRA"],
        description: "Engineered dynamic weather and sports widgets for major news and sports platforms.",
        period: "Summer 2024",
        details: [
            "Improving user engagement and accessibility for TSN & RDS."
        ]
    },
    {
        title: "Le Chainon",
        image: chainon,
        technologies: ["React", "Figma", "Lucidchart", "Notion"],
        description: "A website for Le Chainon to help women in need.",
        period: "March 2024",
        details: [
            "Focused on UX/UI aspects and did a prototype using React and Figma with the help of seniors at Morgan Stanley during the hackathon - Code to Give."
        ]
    },
    {
        title: "Robotix",
        image: robots,
        technologies: ["Java", "Swing"],
        description: "Robots management system called Robotix.",
        period: "August 2023",
        details: [
            "Its goal is to give clients access to their robots, and give access to suppliers an interface to deal with clients.",
            "Use of techniques learnt in course IFT2255 - Software Engineering like Planning, Analysis, Design, Implementation and Testing."
        ]
    },
    {
        title: "Pantry Tracker",
        image: pantry,
        technologies: ["Python", "tkinter", "sqlite3"],
        description: "Created a pantry tracker to be able to track items bought and used.",
        period: "May 2023",
        details: [
            "Processed data in the back-end and inserting them in a database and using tkinter to display the data. SQL queries are used to add, delete, sort data."
        ]
    },
    {
        title: "Weather Interface",
        image: weather_email,
        technologies: ["Python", "flask"],
        description: "Designed a simple weather interface to work on APIs.",
        period: "March 2023",
        details: [
            "Openweather API was used to retrieve current weather data from all cities. SMTP was used to implement the email sending feature using sendinblue. User inputs a city’s name (or geolocation is used) and an email is sent with all information on the weather there."
        ]
    },
    {
        title: "Client-Server System",
        image: course,
        technologies: ["Java", "JavaFX"],
        description: "Designed a GUI using the MVC model.",
        period: "March 2023",
        details: [
            "Client-Server architecture was implemented on a local host. Object-Oriented Programming concepts were used. Implemented for IFT1025 - Programming 2 course.",
            "Used JavaFX to create the GUI that supports actions such as choosing a session, selecting a course and inputting data for the registration."
        ]
    },
    {
        title: "Internship Tracker",
        image: internship,
        technologies: ["Python", "sqlite3", "flask", "HTML", "BootStrap", "JavaScript"],
        description: "Designed a sample internship tracker to be able to visualize information on each application.",
        period: "February 2023",
        details: []
    }
];
