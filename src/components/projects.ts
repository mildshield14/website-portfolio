import intern from "../assets/intern.png"
import weather_email from "../assets/weather_email.png"
import robots from "../assets/robotix.png"
import pantry from "../assets/pantry.png"
import course from "../assets/course.png"
import chainon from "../assets/chainon.png"
import internship from "../assets/internship.png"

type Project = {
    title: Object;
    image: string;
    technologies: string[];
    description: string;
    period: string;
    url?:string;
    details: string[];
};

export const projects: Project[] = [
    {
        title: {en: "Internship Projects", fr: "Projets de Stage"},
        image: intern,
        technologies: ["Vue3", "TypeScript", "SCSS", "JIRA"],
        description: "Engineered dynamic weather and sports widgets for major news and sports platforms.",
        period: "Summer 2024",
        details: [
            "Improving user engagement and accessibility for TSN & RDS."
        ]
    },
    {
        title:  {en: "Le Chainon", fr: "Le Chainon"},
        image: chainon,
        technologies: ["React", "Figma", "Lucidchart", "Notion"],
        description: "A website for Le Chainon to help women in need.",
        period: "March 2024",
        details: [
            "Focused on UX/UI aspects and did a prototype using React and Figma with the help of seniors at Morgan Stanley during the hackathon - Code to Give."
        ]
    },
    {
        title:  {en: "Robotix", fr: "Robotix"},
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
        title:  {en: "Pantry Tracker", fr: "Bouffe Traqueur"},
        image: pantry,
        technologies: ["Python", "tkinter", "sqlite3"],
        description: "Created a pantry tracker to be able to track items bought and used.",
        period: "May 2023",
        details: [
            "Processed data in the back-end and inserting them in a database and using tkinter to display the data. SQL queries are used to add, delete, sort data."
        ]
    },
    {
        title:  {en: "Weather-Email", fr: "Météo-Courriel"},
        image: weather_email,
        technologies: ["Python", "flask"],
        description: "Designed a simple weather interface to work on APIs.",
        period: "March 2023",
        details: [
            "Openweather API was used to retrieve current weather data from all cities. SMTP was used to implement the email sending feature using sendinblue. User inputs a city’s name (or geolocation is used) and an email is sent with all information on the weather there."
        ]
    },
    {
        title:  {en: "Moodle 2.0", fr: "Moodle 2.0"},
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
        title:  {en: "Internship Tracker", fr: "Traqueur de Stage"},
        image: internship,
        technologies: ["Python", "sqlite3", "flask", "HTML", "BootStrap", "JavaScript"],
        description: "Designed a sample internship tracker to be able to visualize information on each application.",
        period: "February 2023",
        details: []
    }
];
