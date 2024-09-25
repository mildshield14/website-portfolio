import intern from "../assets/intern.png"
import weather_email from "../assets/weather_email.png"
import robots from "../assets/robotix.png"
import pantry from "../assets/pantry.png"
import course from "../assets/course.png"
import concept from "../assets/concept.png"
import chainon from "../assets/chainon.png"
import internship from "../assets/internship.png"

export type Project = {
    id: number,
    title: any,
    image: string,
    technologies: string[];
    description: any;
    period: any;
    pdf?: string;
    video?: string;
    url?:string;
    details: any;
};

export const projects: Project[] = [
    {
        id: 1,
        title: { en: "Internship Projects", fr: "Projets de Stage" },
        image: intern,
        technologies: ["Vue3", "TypeScript", "SCSS"],
        description: {
            en: "Developed dynamic widgets for major sports and news platforms, focusing on user engagement and accessibility.",
            fr: "Développement de widgets dynamiques pour d'importants plateformes de sport et de nouvelles, axés sur l'engagement des utilisateurs et l'accessibilité."
        },
        period: { en: "Summer 2024", fr: "Été 2024" },
        details: {
            en: ["Developed widgets for TSN, RDS, CTV News, and BNN Bloomberg websites using Vue 3, SCSS, and Typescript to enhance page interactivity and performance.",
                "Designed and implemented an intern ticket management tool to streamline the creation of JIRA tickets using JIRA’s API V2.",
                "Enhanced accessibility to ensure an inclusive and global user experience."],
                fr: [ "Développement de widgets pour les sites web de TSN, RDS, CTV News et BNN Bloomberg, en utilisant Vue 3 et l'API Composition, SCSS et Typescript pour améliorer l'interactivité et la performance des pages.",
                    "Conception et mise en œuvre d'un outil de gestion des tickets interne pour simplifier la création de tickets JIRA, en utilisant l'API V2 de JIRA.",
                    "Amélioration de l'accessibilité (spécification WAI-ARIA) pour assurer une expérience utilisateur inclusive et globale.",
                ] }
    },
    {
        id: 2,
        title: { en: "Le Chainon", fr: "Le Chainon" },
        image: chainon,
        technologies: ["React", "Figma", "Lucidchart"],
        description: {
            en: "Collaborated on a website redesign for Le Chainon, enhancing online resources for women in need.",
            fr: "Collaboration sur la refonte d'un site web pour Le Chainon, améliorant les ressources en ligne pour les femmes en difficulté."
        },
        period: { en: "March 2024", fr: "Mars 2024" },
        details: {
            en: ["Focused on UX/UI improvements and prototype creation.", "Worked on designs and code with senior developers at Morgan Stanley during a hackathon."],
            fr: ["Concentration sur les améliorations UX/UI et la création de prototypes.", "Conception avec des développeurs seniors de Morgan Stanley lors d'un hackathon."]
        }
    },
    {
        id: 3,
        title: { en: "Robotix", fr: "Robotix" },
        image: robots,
        technologies: ["Java", "Swing"],
        description: {
            en: "Engineered a comprehensive management system for robotics integration, improving operational efficiency.",
            fr: "Conçu un système de gestion complet pour l'intégration robotique, améliorant l'efficacité opérationnelle."
        },
        period: { en: "August 2023", fr: "Août 2023" },
        details: {
            en: ["Provided robust client and supplier interfaces.", "Applied software engineering methodologies from IFT2255 course to optimize system design."],
            fr: ["Fourniture d'interfaces robustes pour clients et fournisseurs.", "Application des méthodologies d'ingénierie logicielle du cours IFT2255 pour optimiser la conception du système."]
        }
    },
    {
        id: 4,
        title: { en: "ConceptNet Explorer", fr: "Explorateur ConceptNet" },
        image: concept,
        technologies: ["PHP", "JavaScript", "MariaDB"],
        description: {
            en: "Developed an interactive guessing game using the ConceptNet API, featuring real-time user interaction.",
            fr: "Développé un jeu de devinettes interactif utilisant l'API ConceptNet, avec interaction utilisateur en temps réel."
        },
        period: { en: "April 2024", fr: "Avril 2024" },
        details: {
            en: ["Designed various game modes with scoring and timing features.", "Implemented real-time database updates to handle user data and rankings.", "Sign up and Login are available for the users authentication."],
            fr: ["Conception de différents modes de jeu avec des fonctionnalités de scoring et de chronométrage.", "Mise en œuvre de mises à jour de la base de données en temps réel pour gérer les données des utilisateurs et les classements.", "Inscription et Connexion pour l'authentification des utilisateurs"]
        }
    },
    {
        id: 5,
        title: { en: "Weather-Email Integration", fr: "Intégration Météo-Courriel" },
        image: weather_email,
        technologies: ["Python", "Flask"],
        description: {
            en: "Developed a service to fetch and email weather updates, enhancing user interaction through automated processes.",
            fr: "Développé un service pour récupérer et envoyer par courriel les mises à jour météorologiques, améliorant l'interaction utilisateur grâce à des processus automatisés."
        },
        period: { en: "March 2023", fr: "Mars 2023" },
        details: {
            en: [
                "Utilized the OpenWeather API for real-time weather data.",
                "Integrated SMTP with SendinBlue for reliable email dispatch."
            ],
            fr: [
                "Utilisation de l'API OpenWeather pour les données météorologiques en temps réel.",
                "Intégration de SMTP avec SendinBlue pour l'envoi fiable d'emails."
            ]
        }
    },
    {
        id: 6,
        title: { en: "Pantry Tracker System", fr: "Système de Suivi de Garde-Manger" },
        image: pantry,
        technologies: ["Python", "Tkinter", "SQLite3"],
        description: {
            en: "Created a desktop application to manage pantry inventory effectively, with features to add, remove, and categorize items.",
            fr: "Créé une application de bureau pour gérer efficacement l'inventaire du garde-manger, avec des fonctionnalités pour ajouter, supprimer et catégoriser les articles."
        },
        period: { en: "May 2023", fr: "Mai 2023" },
        details: {
            en: [
                "Designed the backend logic to process and store data in SQLite3.",
                "Developed a user-friendly interface using Tkinter."
            ],
            fr: [
                "Conception de la logique backend pour traiter et stocker les données dans SQLite3.",
                "Développement d'une interface utilisateur conviviale avec Tkinter."
            ]
        }
    },
    {
        id: 7,
        title: { en: "Educational Platform - Moodle 2.0", fr: "Plateforme Éducative - Moodle 2.0" },
        image: course,
        technologies: ["Java", "JavaFX"],
        description: {
            en: "Engineered an interface for course registration with advanced features for educational management and online learning.",
            fr: "Conçu une interface d'inscription aux cours avec des fonctionnalités avancées pour la gestion éducative et l'apprentissage en ligne."
        },
        period: { en: "March 2023", fr: "Mars 2023" },
        details: {
            en: [
                "Implemented client-server architecture for effective data handling.",
                "Utilized JavaFX for dynamic and responsive user interfaces."
            ],
            fr: [
                "Mise en œuvre de l'architecture client-serveur pour une gestion efficace des données.",
                "Utilisation de JavaFX pour des interfaces utilisateur dynamiques et réactives."
            ]
        }
    },
    {
        id: 8,
        title: { en: "Internship Application Tracker", fr: "Suivi des Candidatures de Stage" },
        image: internship,
        technologies: ["Python", "SQLite3", "Flask", "HTML", "Bootstrap", "JavaScript"],
        description: {
            en: "Developed a web application to track internship applications and manage applicant data seamlessly.",
            fr: "Développé une application web pour suivre les candidatures de stage et gérer les données des candidats de manière fluide."
        },
        period: { en: "February 2023", fr: "Février 2023" },
        details: {
            en: [
                "Designed to offer real-time insights into application statuses.",
                "Integrated with databases to store and retrieve application data effectively."
            ],
            fr: [
                "Conçu pour offrir des informations en temps réel sur les statuts des candidatures.",
                "Intégré avec des bases de données pour stocker et récupérer efficacement les données des candidatures."
            ]
        }
    }
];
