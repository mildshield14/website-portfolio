import type { Content } from '../types'

const en: Content = {
  meta: {
    name: 'Vennila Sooben',
    role: 'Software Developer & AI Systems Researcher',
    uni: 'M.Sc. Computer Science, Université de Montréal',
  },

  nav: {
    work: 'Work',
    research: 'Research',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    about: 'About',
    contact: 'Contact',
    cv: 'Resume / CV',
  },

  ui: {
    current: 'Current',
    featured: 'Featured',
    active: 'Active',
    completed: 'Completed',
    viewAllWork: 'View all work',
    email: 'Email',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    resumeLabel: 'Resume / CV',
    readMore: 'Read more',
    collapse: 'Collapse',
  },

  hero: {
    eyebrow: 'Software Developer & AI Systems Researcher',
    name: 'Vennila Sooben',
    positioning: 'I build software tools around AI, automation, and interfaces.',
    bio: "I'm a master's student in computer science at Université de Montréal. My current work moves between prompt engineering research, internal tools, process automation, and frontend systems.",
    currently_label: 'Currently',
    currently_prose: 'Researching prompt engineering at D&G / MITACS, working on process automation at iA, and building academic tools at UdeM.',
    artifact: `promptspec Catalog {\n  patterns: Persona, Recipe, SchemaSpecs\n  output: graph + api\n}`,
    cta_work: 'Selected work',
    cta_research: 'Research',
    cta_cv: 'Resume / CV',
    cta_contact: 'Contact',
  },

  work: {
    eyebrow: 'Selected Work',
    heading: 'Case studies',
    sub: 'A few projects from research, software work, and design systems.',
    challenge: 'Challenge',
    approach: 'Approach',
    outcome: 'Outcome',
    expand: 'Read more',
    collapse: 'Collapse',
    items: [
      {
        id: 'promptspec',
        type: 'Research · Prompt Engineering',
        year: '2026 to present',
        featured: true,
        role: 'Primary researcher',
        codeSnippet: `promptspec Catalog {\n  patterns { Persona, Recipe, SchemaSpecs }\n  tasks    { ContentSummary, Translation, SEO }\n  output   { graph: Neo4j, api: task-aware }\n}`,
        pipelineCaption: 'PromptSpec pipeline: production prompts are analyzed into reusable prompt patterns, encoded in a DSL, transformed into a property-graph model, generated as Cypher, loaded into Neo4j, and exposed through an API layer.',
        title: 'PromptSpec / PromptStudio',
        sub: 'Research on prompt engineering: DSL design, prompt analysis, and early specification work.',
        challenge:
          'Prompt engineering is still informal. Prompts get written, edited, copied, and replaced without a clear way to describe intent, context, or constraints.',
        approach:
          'Analyzing approximately 55,000 real-world prompts to find common structures and intent types. Exploring a small domain-specific language for describing prompts more clearly.',
        outcome:
          'Using the findings to shape PromptSpec, an early format for documenting and comparing prompts.',
        tags: ['Prompt Engineering', 'DSL Design', 'NLP', 'Python', 'Research'],
      },
      {
        id: 'mitacs',
        type: 'Research · Large-Scale Analysis',
        year: '2026 to present',
        featured: false,
        role: 'Research intern',
        title: 'Draft & Goal / MITACS Research',
        sub: 'Empirical analysis of ~55,000 real-world prompts to surface structural patterns and intent types.',
        challenge:
          'Without looking closely at how prompts are written in practice, it is hard to define useful patterns or evaluation criteria.',
        approach:
          'Analyzing approximately 55,000 real-world prompts to identify structural patterns, intent types, and common failure modes. Findings feed directly into the PromptSpec specification direction.',
        outcome:
          'Developing a taxonomy of prompt structures and intent types. The work is still ongoing and feeds directly into PromptSpec.',
        tags: ['NLP', 'Data Analysis', 'Python', 'Research', 'MITACS'],
      },
      {
        id: 'udem',
        type: 'Full-Stack · AI Tools',
        year: '2025 to present',
        featured: false,
        role: 'Technical assistant',
        title: 'UdeM AI-Assisted Academic Tooling',
        sub: 'AI-assisted features and dashboards for academic research and course management.',
        challenge:
          'Academic tools weren\'t designed for AI-assisted workflows. UI patterns were inconsistent across faculty applications.',
        approach:
          'Building Nuxt, Vue, TypeScript components and interactive dashboards for course management tools. Focused on accessible UI patterns aligned with WCAG guidelines.',
        outcome:
          'Contributed to tools used across multiple faculty projects. Reduced interface inconsistency and improved accessibility.',
        tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Accessibility'],
      },
      {
        id: 'fas',
        type: 'Design Systems · Component Library',
        year: '2025 to present',
        featured: false,
        role: 'Technical assistant',
        title: 'FAS UI Component Library',
        sub: 'Accessible, reusable component library for Faculté des arts et des sciences applications.',
        challenge:
          'Inconsistent UI patterns across faculty applications, with no shared component system or clear accessibility baseline.',
        approach:
          'Helped design and build a modular Vue 3/TypeScript component library with an accessibility focus. Components include usage documentation and accessibility guidance.',
        outcome:
          'Components contributed to multiple faculty projects. Helped reduce interface inconsistency and support accessibility across the applications.',
        tags: ['Vue 3', 'TypeScript', 'Design Systems', 'Accessibility'],
      },
      {
        id: 'bell',
        type: 'Production · Frontend Engineering',
        year: '2024',
        featured: false,
        role: 'Software development intern',
        title: 'Bell Media: TSN & RDS Frontend',
        sub: 'Production Vue 3/TypeScript/SCSS components for TSN and RDS, plus internal automation tools for the frontend team.',
        challenge:
          'High-traffic sports media platform with strict design system requirements and tight production constraints.',
        approach:
          "Developed Vue 3/TypeScript/SCSS production components following Bell Media's design system standards. Also built internal automation tooling used across multiple teams for Jira ticket creation and workflow management.",
        outcome:
          'Delivered production components for TSN and RDS. Developed internal automation tooling used across multiple teams.',
        tags: ['Vue 3', 'TypeScript', 'SCSS', 'Design Systems', 'Production'],
      },
      {
        id: 'medisync',
        type: 'AI · Health Tech · Hackathon',
        year: '2024',
        featured: false,
        role: 'Hackathon project',
        title: 'MediSync',
        sub: 'Post-hospitalization follow-up platform with an AI assistant for recovery guidance, medication reminders, and appointment prep.',
        challenge:
          'Patients discharged from hospital often struggle to follow recovery instructions, track medications, and manage follow-up appointments without structured support.',
        approach:
          'Designed and prototyped a mobile-oriented platform for post-hospitalization follow-up. Built an AI assistant to answer recovery questions, surface medication reminders, and help users prepare for upcoming appointments.',
        outcome:
          'Working prototype demonstrating AI-assisted patient follow-up. Focused on clarity, accessibility, and reducing cognitive load during recovery.',
        tags: ['React', 'Node.js', 'OpenAI API', 'Health Tech'],
      },
    ],
  },

  research: {
    eyebrow: 'Research Direction',
    heading: 'What makes prompt engineering hard to think about',
    context: 'MITACS / Draft & Goal, Université de Montréal, 2026 to present',
    abstract_label: 'What I\'m trying to understand',
    abstract:
      'Prompt engineering is becoming part of everyday AI work, but it is still mostly informal. Prompts get written, tweaked, copied, and thrown away. I want to understand where software engineering ideas help and where they make things too rigid.',
    questions_label: 'Questions I\'m sitting with',
    questions: [
      'What formal primitives are needed to specify intent, context, and constraints in a way that works across different models?',
      'Can evaluation be systematic and reproducible without being rigid?',
      'What would useful editor support for prompt engineering actually look like?',
      'What makes two prompts functionally equivalent, and does that change across model families?',
    ],
    methods_label: 'How I\'m approaching it',
    methods:
      'Analyzing real-world prompts at scale to find repeated structures. Using ideas from programming languages, HCI, and software engineering, then testing what is useful in PromptSpec.',
    keywords: ['Prompt Engineering', 'DSL Design', 'LLM Evaluation', 'Software Specification', 'HCI', 'AI Tools'],
  },

  experience: {
    eyebrow: 'Experience',
    heading: 'Roles',
    items: [
      {
        company: 'iA Financial Group',
        role: 'Strategic Process & Automation Analyst',
        period: 'May 2026 to present',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Starting in May 2026.',
        tags: ['Process Analysis', 'Automation', 'Financial Services'],
      },
      {
        company: 'Draft & Goal / MITACS',
        role: 'Research Intern, Prompt Engineering',
        period: '2026 to present',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Analyzing approximately 55,000 real-world prompts to surface structural patterns and intent types. Using that work to shape PromptSpec.',
        tags: ['Research', 'NLP', 'Prompt Engineering', 'Python'],
      },
      {
        company: 'Université de Montréal',
        role: 'Technical Assistant',
        period: 'May 2025 to present',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Contributing to Nuxt/Vue/TypeScript tools, AI-assisted features, and accessible UI components, including the FAS Component Library, for course management applications.',
        tags: ['Vue 3', 'TypeScript', 'AI Tools', 'Full-Stack'],
      },
      {
        company: 'Université de Montréal',
        role: 'Teaching Assistant, Web Development',
        period: '2024 to 2025',
        loc: 'Montréal, QC',
        current: false,
        summary:
          'Supporting undergraduate students in web development coursework covering HTML, CSS, JavaScript, accessibility, and responsive design.',
        tags: ['Teaching', 'HTML/CSS', 'JavaScript', 'Accessibility'],
      },
      {
        company: 'Bell Media',
        role: 'Software Development Intern',
        period: 'May 2024 to August 2024',
        loc: 'Montréal, QC',
        current: false,
        summary:
          "Developed Vue 3/TypeScript/SCSS production components for TSN and RDS following Bell Media's design system. Also built internal automation tools for the frontend team.",
        tags: ['Vue 3', 'TypeScript', 'SCSS', 'Production'],
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    heading: 'Education',
    items: [
      {
        degree: 'M.Sc. Computer Science',
        institution: 'Université de Montréal',
        period: '2025 to 2027 (expected)',
        detail: 'Research focus: prompt engineering, DSL design, and AI tools. MITACS-affiliated research internship.',
      },
      {
        degree: 'B.Sc. Computer Science',
        institution: 'Université de Montréal',
        period: '2022 to 2025',
        detail: 'Software engineering and AI.',
      },
    ],
  },

  skills: {
    eyebrow: 'Skills',
    heading: 'Capabilities',
    clusters: [
      { label: 'Languages', skills: ['TypeScript', 'Python', 'JavaScript', 'HTML & CSS', 'SCSS'] },
      { label: 'Frontend', skills: ['Vue 3', 'Nuxt', 'React', 'Tailwind CSS', 'Accessibility'] },
      { label: 'Backend & Tooling', skills: ['Node.js', 'REST APIs', 'Vite', 'Git', 'CI/CD'] },
      { label: 'AI & Research', skills: ['Prompt Engineering', 'DSL Design', 'LLM Workflows', 'NLP', 'OpenAI API'] },
      { label: 'Design & Systems', skills: ['Figma', 'UI Component Libraries', 'Design Systems', 'Responsive Design'] },
      { label: 'Process & Soft Skills', skills: ['Workflow Automation', 'Process Mapping', 'Technical Writing', 'Cross-team Collaboration', 'Problem Structuring'] },
    ],
  },

  community: {
    eyebrow: 'Community & Leadership',
    heading: 'Involvement',
    items: [
      {
        org: 'RFIUM',
        role: 'Media & Events Coordinator',
        desc: 'Supporting women in research and computing at Université de Montréal, organizing events, managing communications, and helping build a community for women navigating graduate school and technical careers. It\'s also why I go to events like JFFI and CAN/CWIC.',
      },
    ],
  },

  about: {
    eyebrow: 'About',
    heading: 'The thread through my work',
    p1: 'I like building things that are easier to understand than they look. My work tends to fall somewhere between research and engineering — taking something apart to understand it, making a tool actually useful, or finding the clear version of a messy process.',
    p2: "This is still early research. I'm trying to understand what should be formalized, what should stay flexible, and what kind of tooling would actually help people work with prompts.",
    quote: "Making something genuinely understandable is usually the hardest part. That's what draws me to this work.",
  },

  beyond: {
    eyebrow: 'Beyond the screen',
    heading: 'A few things outside work',
    intro: 'A small personal note: where I come from, what I practice, and a few things I make when I step away from the screen.',
    seeMore: 'See more',
    origin: {
      text: "Originally from Mauritius and now based in Montréal, I've learned to move between languages, cultures, and ways of thinking. That shows up in how I work: technical, curious, adaptable, and drawn to tools that make complex systems easier to understand.",
      caption: 'Mauritius → Montréal',
    },
    items: [
      { label: 'Endurance', text: 'Running has become one of the ways I build discipline outside work.' },
      { label: 'Baking', text: 'I like baking projects that reward patience: laminated dough, layered cakes, and small details.' },
      { label: 'Community', text: 'At RFIUM, I help with media and events for women in research and computing. It\'s also why I go to events like JFFI and CAN/CWIC.' },
    ],
    previewGallery: [
      {
        id: 'croissants',
        title: 'Weekend croissants',
        category: 'Laminated pastry',
        description: 'One of my favorite kinds of projects: this batch tested a two-day lamination method. Slow, deliberate, and worth every fold.',
        alt: 'Homemade croissants arranged beside pink tulips.',
      },
      {
        id: 'entremet',
        title: 'Raspberry pistachio entremet',
        category: 'Entremet',
        description: 'Built in layers: pistachio dacquoise, pistachio praline croustillant with crêpe dentelle, white chocolate, raspberry insert, pistachio mousse, and a raspberry mirror glaze.',
        alt: 'Red raspberry and pistachio entremet with careful decoration.',
      },
      {
        id: 'fraisier',
        title: 'Strawberry fraisier',
        category: 'Layered cake',
        description: 'Génoise soaked in a light Earl Grey, lavender, and chamomile syrup, layered with classic mousseline cream, mascarpone chantilly with vanilla, and a lot of fresh strawberries.',
        alt: 'Strawberry fraisier cake with visible layers and berries.',
      },
      {
        id: 'floral-cupcakes',
        title: 'Floral cupcakes',
        category: 'Decoration',
        description: 'These were mostly about piping practice and detail work. I enjoy bakes that let me focus on texture and decoration.',
        alt: 'Cupcakes decorated with piped floral buttercream.',
      },
    ],
    gallery: [
      {
        id: 'croissants',
        title: 'Weekend croissants',
        category: 'Laminated pastry',
        description: 'One of my favorite kinds of projects: this batch tested a two-day lamination method. Slow, deliberate, and worth every fold.',
        alt: 'Homemade croissants arranged beside pink tulips.',
      },
      {
        id: 'entremet',
        title: 'Raspberry pistachio entremet',
        category: 'Entremet',
        description: 'Built in layers: pistachio dacquoise, pistachio praline croustillant with crêpe dentelle, white chocolate, raspberry insert, pistachio mousse, and a raspberry mirror glaze.',
        alt: 'Red raspberry and pistachio entremet with careful decoration.',
      },
      {
        id: 'fraisier',
        title: 'Strawberry fraisier',
        category: 'Layered cake',
        description: 'Génoise soaked in a light Earl Grey, lavender, and chamomile syrup, layered with classic mousseline cream, mascarpone chantilly with vanilla, and a lot of fresh strawberries.',
        alt: 'Strawberry fraisier cake with visible layers and berries.',
      },
      {
        id: 'floral-cupcakes',
        title: 'Floral cupcakes',
        category: 'Decoration',
        description: 'These were mostly about piping practice and detail work. I enjoy bakes that let me focus on texture and decoration.',
        alt: 'Cupcakes decorated with piped floral buttercream.',
      },
      {
        id: 'berry-cake',
        title: 'Berry celebration cake',
        category: 'Celebration cake',
        description: 'Vanilla génoise soaked in Earl Grey syrup, layered with strawberry coulis and subtly vanilla-scented chantilly, finished with fresh fruit.',
        alt: 'Berry celebration cake with small lights in the background.',
      },
      {
        id: 'crepe-cake',
        title: 'Mille crêpes cake',
        category: 'Layered dessert',
        description: 'Alternating layers of dark chocolate cream and pistachio-vanilla cream. A lot of repetition, and satisfying every time.',
        alt: 'Layered crepe cake served on a plate.',
      },
      {
        id: 'crepe-cake-slice',
        title: 'Inside the crepe cake',
        category: 'Cross-section',
        description: 'The inside of the mille crêpes — alternating layers of dark chocolate cream and pistachio-vanilla cream.',
        alt: 'Slice of chocolate crepe cake showing its layers.',
      },
      {
        id: 'patterned-cookies',
        title: 'Patterned cookies',
        category: 'Cookies',
        description: 'A fun baking project. Sometimes that\'s enough.',
        alt: 'Homemade patterned cookies with spotted decoration.',
      },
      {
        id: 'cream-puffs',
        title: 'Cream puffs',
        category: 'Choux pastry',
        description: 'Craquelin choux filled with crème pâtissière. One of the formats I always come back to.',
        alt: 'Cream puffs arranged on a tray.',
      },
      {
        id: 'cinnamon-rolls',
        title: 'Baking break',
        category: 'Still life',
        description: 'A quieter moment that says a lot about how I spend my free time.',
        alt: 'A quiet baking break with pastries and a tablet nearby.',
      },
      {
        id: 'milk-bread-rolls',
        title: 'Milk bread rolls',
        category: 'Bread',
        description: 'Not every baking project has to be dramatic. Sometimes softness is the whole point.',
        alt: 'Soft milk bread rolls beside tulips and a tablet.',
      },
      {
        id: 'sesame-buns',
        title: 'Sesame buns',
        category: 'Bread',
        description: 'A simple bread project that still feels satisfying every time.',
        alt: 'Homemade sesame buns on a tray.',
      },
      {
        id: 'custard-bakes',
        title: 'Basque cheesecake',
        category: 'Cheesecake',
        description: 'A lighter version made with Greek yogurt. A little rustic, very comforting.',
        alt: 'Basque cheesecake with a caramelized top.',
      },
      {
        id: 'trianon',
        title: 'Chocolate trianon',
        category: 'Entremet',
        description: 'Almond dacquoise base, hazelnut-almond feuillantine praline croustillant, chocolate mousse, and a cocoa mirror glaze.',
        alt: 'Chocolate trianon entremet with cocoa mirror glaze.',
      },
    ],
    page: {
      eyebrow: 'Kitchen notes',
      heading: 'Baking gallery',
      intro: 'A small curated gallery of baking projects: laminated dough, layered cakes, choux pastry, bread, and quieter kitchen experiments.',
      kitchenAccent: 'A few things I bake',
      enduranceTitle: 'Endurance',
      enduranceText: 'Running has become one of the ways I build discipline outside work. I have completed a half-marathon and I am slowly building toward bigger endurance goals, including a future 70.3 Ironman.',
      communityTitle: 'Community',
      communityText: 'At RFIUM, I help with media and events. I care about spaces where students and women in computing feel supported and visible. It\'s also why I go to events like JFFI and CAN/CWIC.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    heading: "Let's talk",
    sub: 'Research collaboration, engineering roles, or a good conversation about AI tools.',
    email: 'vennila.sooben@umontreal.ca',
    github: 'github.com/mildshield14',
    linkedin: 'linkedin.com/in/vennilasooben',
    resumeLabel: 'Resume / CV',
    resumeFile: '/resume-en.pdf',
  },

  footer: {
    copy: 'Vennila Sooben · 2026',
    made: 'Designed & built by hand.',
  },
}

const fr: Content = {
  meta: {
    name: 'Vennila Sooben',
    role: 'Développeuse logicielle & chercheuse en systèmes IA',
    uni: 'M.Sc. Informatique, Université de Montréal',
  },

  nav: {
    work: 'Réalisations',
    research: 'Recherche',
    experience: 'Expérience',
    education: 'Formation',
    skills: 'Compétences',
    about: 'À propos',
    contact: 'Contact',
    cv: 'CV',
  },

  ui: {
    current: 'Poste actuel',
    featured: 'En vedette',
    active: 'En cours',
    completed: 'Terminé',
    viewAllWork: 'Voir tous les travaux',
    email: 'Courriel',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    resumeLabel: 'CV',
    readMore: 'Lire plus',
    collapse: 'Réduire',
  },

  hero: {
    eyebrow: 'Développeuse logicielle & chercheuse en systèmes IA',
    name: 'Vennila Sooben',
    positioning: "Je développe des outils logiciels autour de l'IA, de l'automatisation et des interfaces.",
    bio: "Je suis étudiante à la maîtrise en informatique à l'Université de Montréal. En ce moment, mon travail touche à l'ingénierie de prompts, aux outils internes, à l'automatisation de processus et aux systèmes front-end.",
    currently_label: 'En ce moment',
    currently_prose: "Recherche en ingénierie de prompts chez D&G / MITACS, automatisation de processus chez iA Groupe Financier, et outils académiques à l'UdeM.",
    artifact: `promptspec Catalog {\n  patterns: Persona, Recipe, SchemaSpecs\n  output: graph + api\n}`,
    cta_work: 'Réalisations',
    cta_research: 'Recherche',
    cta_cv: 'CV',
    cta_contact: 'Contact',
  },

  work: {
    eyebrow: 'Travaux sélectionnés',
    heading: 'Études de cas',
    sub: 'Quelques projets de recherche, de développement logiciel et de systèmes UI.',
    challenge: 'Défi',
    approach: 'Démarche',
    outcome: 'Résultat',
    expand: 'Lire plus',
    collapse: 'Réduire',
    items: [
      {
        id: 'promptspec',
        type: 'Recherche · Ingénierie des prompts',
        year: '2026 à présent',
        featured: true,
        role: 'Chercheuse principale',
        codeSnippet: `promptspec Catalog {\n  patterns { Persona, Recipe, SchemaSpecs }\n  tasks    { ContentSummary, Translation, SEO }\n  output   { graph: Neo4j, api: task-aware }\n}`,
        pipelineCaption: 'Pipeline PromptSpec : les prompts de production sont analysés en patrons réutilisables, encodés dans un DSL, transformés en modèle de graphe de propriétés, générés en Cypher, chargés dans Neo4j, puis exposés par une couche API.',
        title: 'PromptSpec / PromptStudio',
        sub: 'Recherche sur l\'ingénierie des prompts : conception de DSL, analyse de prompts et premières spécifications.',
        challenge:
          'L\'ingénierie des prompts reste très informelle. Les prompts sont écrits, modifiés, copiés et remplacés sans façon claire de décrire l\'intention, le contexte ou les contraintes.',
        approach:
          'Analyse d\'environ 55 000 prompts réels pour identifier des structures et des types d\'intention récurrents. Exploration d\'un petit DSL pour mieux décrire les prompts.',
        outcome:
          'Utilisation des résultats pour façonner PromptSpec, un format encore jeune pour documenter et comparer des prompts.',
        tags: ['Ingénierie prompts', 'DSL', 'TALN', 'Python', 'Recherche'],
      },
      {
        id: 'mitacs',
        type: 'Recherche · Analyse à grande échelle',
        year: '2026 à présent',
        featured: false,
        role: 'Stagiaire de recherche',
        title: 'Recherche Draft & Goal / MITACS',
        sub: 'Analyse empirique d\'environ 55 000 prompts réels pour identifier des patrons structurels et des types d\'intention.',
        challenge:
          'Sans regarder de près les pratiques réelles, il est difficile de définir des patrons utiles ou des critères d\'évaluation pertinents.',
        approach:
          'Analyse d\'environ 55 000 prompts réels pour identifier des patrons structurels, des types d\'intention et des modes de défaillance courants. Les résultats alimentent la direction PromptSpec.',
        outcome:
          'Développement d\'une taxonomie des structures de prompts et des types d\'intention. Travail en cours, orientant à la fois la conception des spécifications et l\'exploration d\'outils.',
        tags: ['TALN', 'Analyse de données', 'Python', 'Recherche', 'MITACS'],
      },
      {
        id: 'udem',
        type: 'Full-Stack · Outillage IA',
        year: '2025 à présent',
        featured: false,
        role: 'Assistante technique',
        title: 'Outils académiques IA, UdeM',
        sub: 'Fonctionnalités IA et tableaux de bord pour la gestion de la recherche et des cours à l\'Université de Montréal.',
        challenge:
          'Les outils académiques existants n\'étaient pas conçus pour les flux assistés par IA, et les interfaces étaient incohérentes entre les applications facultaires.',
        approach:
          'Contribution au développement de composants Nuxt/Vue/TypeScript et tableaux de bord pour les outils de gestion de cours. Aide à l\'élaboration de motifs UI accessibles conformes aux lignes directrices WCAG.',
        outcome:
          'Contribution à des outils utilisés dans plusieurs projets facultaires. Aide à la réduction des incohérences d\'interface et à l\'amélioration de la couverture d\'accessibilité.',
        tags: ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Accessibilité'],
      },
      {
        id: 'fas',
        type: 'Systèmes de design · Bibliothèque de composants',
        year: '2025 à présent',
        featured: false,
        role: 'Assistante technique',
        title: 'Bibliothèque de composants FAS',
        sub: 'Bibliothèque de composants accessibles et réutilisables pour la Faculté des arts et des sciences.',
        challenge:
          'Incohérence des interfaces entre les applications facultaires, sans système de composants partagé ni ligne de base d\'accessibilité claire.',
        approach:
          'Contribution à la conception et au développement d\'une bibliothèque de composants Vue 3/TypeScript axée sur l\'accessibilité. Documentation des composants avec guide d\'utilisation.',
        outcome:
          'Composants intégrés dans plusieurs projets facultaires. Contribution à la réduction des incohérences d\'interface.',
        tags: ['Vue 3', 'TypeScript', 'Systèmes de design', 'Accessibilité'],
      },
      {
        id: 'bell',
        type: 'Production · Ingénierie frontend',
        year: '2024',
        featured: false,
        role: 'Stagiaire en développement',
        title: 'Bell Media: frontend TSN & RDS',
        sub: 'Composants Vue 3/TypeScript/SCSS en production pour TSN et RDS, et outils d\'automatisation internes.',
        challenge:
          'Plateforme à fort trafic avec des exigences strictes en matière de design system et des contraintes de production serrées.',
        approach:
          'Développement de composants de production Vue 3/TypeScript/SCSS selon le design system Bell Media. Développement d\'outils d\'automatisation internes utilisés par plusieurs équipes pour la gestion de tickets Jira.',
        outcome:
          'Composants livrés en production pour TSN et RDS. Outillage d\'automatisation interne utilisé par plusieurs équipes.',
        tags: ['Vue 3', 'TypeScript', 'SCSS', 'Systèmes de design', 'Production'],
      },
      {
        id: 'medisync',
        type: 'IA · Santé · Hackathon',
        year: '2024',
        featured: false,
        role: 'Hackathon',
        title: 'MediSync',
        sub: 'Plateforme de suivi post-hospitalisation avec un assistant IA pour la récupération, les rappels médicaments et la préparation aux rendez-vous.',
        challenge:
          'Les patients sortis de l\'hôpital peinent souvent à suivre leurs instructions de récupération, à gérer leurs médicaments et leurs rendez-vous de suivi.',
        approach:
          'Conception et prototypage d\'une plateforme de suivi post-hospitalisation. Développement d\'un assistant IA pour répondre aux questions de récupération, rappeler les médicaments et aider à préparer les rendez-vous.',
        outcome:
          'Prototype fonctionnel illustrant un suivi patient assisté par IA, axé sur la clarté et la réduction de la charge cognitive.',
        tags: ['React', 'Node.js', 'OpenAI API', 'Santé numérique'],
      },
    ],
  },

  research: {
    eyebrow: 'Axe de recherche',
    heading: 'Ce qui rend l\'ingénierie des prompts difficile à penser',
    context: 'MITACS / Draft & Goal, Université de Montréal, 2026 à présent',
    abstract_label: 'Ce que j\'essaie de comprendre',
    abstract:
      'L\'ingénierie des prompts devient une partie normale du travail avec l\'IA, mais elle reste très informelle. Les prompts se rédigent, se modifient, se copient et se jettent. Je veux comprendre où les idées du génie logiciel aident, et où elles rendent les choses trop rigides.',
    questions_label: 'Questions que je me pose',
    questions: [
      'Quelles primitives formelles sont nécessaires pour spécifier l\'intention, le contexte et les contraintes d\'une façon qui fonctionne sur différents modèles ?',
      'Peut-on évaluer de façon systématique et reproductible sans être rigide ?',
      'À quoi ressemblerait une aide utile dans un éditeur pour travailler avec des prompts ?',
      'Qu\'est-ce qui rend deux prompts fonctionnellement équivalents, et est-ce que ça change selon la famille de modèle ?',
    ],
    methods_label: 'Comment j\'aborde cela',
    methods:
      'Analyser des prompts réels à grande échelle pour trouver des structures répétées. Utiliser des idées des langages de programmation, de l\'IHM et du génie logiciel, puis tester ce qui est utile dans PromptSpec.',
    keywords: ['Ingénierie prompts', 'DSL', 'Évaluation LLM', 'Spécification logicielle', 'IHM', 'Outils IA'],
  },

  experience: {
    eyebrow: 'Expérience',
    heading: 'Parcours',
    items: [
      {
        company: 'iA Groupe Financier',
        role: 'Analyste, processus stratégiques et automatisation',
        period: 'Mai 2026 à présent',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Prise de poste en mai 2026.',
        tags: ['Analyse de processus', 'Automatisation', 'Services financiers'],
      },
      {
        company: 'Draft & Goal / MITACS',
        role: 'Stagiaire de recherche, ingénierie des prompts',
        period: '2026 à présent',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Analyse d\'environ 55 000 prompts réels pour identifier des patrons structurels et des types d\'intention. Utilisation de ce travail pour orienter PromptSpec.',
        tags: ['Recherche', 'TALN', 'Ingénierie prompts', 'Python'],
      },
      {
        company: 'Université de Montréal',
        role: 'Assistante technique',
        period: 'Mai 2025 à présent',
        loc: 'Montréal, QC',
        current: true,
        summary:
          'Contribution au développement d\'outils Nuxt/Vue/TypeScript, de fonctionnalités IA et de composants UI accessibles, dont la bibliothèque de composants FAS, pour les applications de gestion de cours.',
        tags: ['Vue 3', 'TypeScript', 'Outils IA', 'Full-Stack'],
      },
      {
        company: 'Université de Montréal',
        role: 'Auxiliaire d\'enseignement, développement web',
        period: '2024 à 2025',
        loc: 'Montréal, QC',
        current: false,
        summary:
          'Accompagnement des étudiants de premier cycle dans les cours de développement web : HTML, CSS, JavaScript, accessibilité et design responsive.',
        tags: ['Enseignement', 'HTML/CSS', 'JavaScript', 'Accessibilité'],
      },
      {
        company: 'Bell Media',
        role: 'Stagiaire en développement logiciel',
        period: 'Mai 2024 à août 2024',
        loc: 'Montréal, QC',
        current: false,
        summary:
          'Développement de composants de production Vue 3/TypeScript/SCSS pour TSN et RDS selon le design system Bell Media. Développement d\'outils d\'automatisation internes pour l\'équipe.',
        tags: ['Vue 3', 'TypeScript', 'SCSS', 'Production'],
      },
    ],
  },

  education: {
    eyebrow: 'Formation',
    heading: 'Parcours académique',
    items: [
      {
        degree: 'M.Sc. Informatique',
        institution: 'Université de Montréal',
        period: '2025 à 2027 (prévu)',
        detail: 'Axe de recherche : ingénierie des prompts, conception de DSL et outils IA. Stage de recherche affilié MITACS.',
      },
      {
        degree: 'B.Sc. Informatique',
        institution: 'Université de Montréal',
        period: '2022 à 2025',
        detail: 'Génie logiciel et IA.',
      },
    ],
  },

  skills: {
    eyebrow: 'Compétences',
    heading: 'Capacités',
    clusters: [
      { label: 'Langages', skills: ['TypeScript', 'Python', 'JavaScript', 'HTML & CSS', 'SCSS'] },
      { label: 'Frontend', skills: ['Vue 3', 'Nuxt', 'React', 'Tailwind CSS', 'Accessibilité'] },
      { label: 'Backend & Outillage', skills: ['Node.js', 'REST APIs', 'Vite', 'Git', 'CI/CD'] },
      { label: 'IA & Recherche', skills: ['Ingénierie des prompts', 'DSL', 'Flux LLM', 'TALN', 'OpenAI API'] },
      { label: 'Design & Systèmes', skills: ['Figma', 'Bibliothèques de composants', 'Systèmes de design', 'Design responsive'] },
      { label: 'Processus & compétences transversales', skills: ['Automatisation des flux', 'Cartographie de processus', 'Rédaction technique', 'Collaboration interéquipes', 'Structuration de problèmes'] },
    ],
  },

  community: {
    eyebrow: 'Communauté & leadership',
    heading: 'Implication',
    items: [
      {
        org: 'RFIUM',
        role: 'Responsable médias et événements',
        desc: "Soutien aux femmes en recherche et en informatique à l'Université de Montréal, organisation d'événements, gestion des communications et construction d'une communauté pour les femmes en études supérieures et en carrières techniques. C'est aussi pourquoi je participe à des événements comme JFFI et CAN/CWIC.",
      },
    ],
  },

  about: {
    eyebrow: 'À propos',
    heading: 'Le fil conducteur de mon travail',
    p1: "J'aime construire des choses plus faciles à comprendre qu'elles ne le paraissent. Mon travail se situe souvent entre la recherche et l'ingénierie — démêler quelque chose de complexe, rendre un outil vraiment utilisable, ou trouver la version claire d'un processus chaotique.",
    p2: "C'est encore un sujet en construction. J'essaie de comprendre ce qui mérite d'être formalisé, ce qui doit rester flexible et quels outils peuvent vraiment aider à travailler avec des prompts.",
    quote: "Rendre quelque chose vraiment compréhensible, c'est presque toujours la partie la plus difficile. C'est ce qui m'attire dans ce travail.",
  },

  beyond: {
    eyebrow: 'Au-delà du code',
    heading: 'Quelques repères en dehors du travail',
    intro: 'Une note plus personnelle : d’où je viens, ce que je pratique, et quelques choses que je prépare quand je quitte l’écran.',
    seeMore: 'Voir plus',
    origin: {
      text: "Originaire de l'île Maurice et maintenant basée à Montréal, j'ai appris à naviguer entre les langues, les cultures et les façons de penser. Cela se retrouve dans ma manière de travailler : technique, curieuse, adaptable et attirée par les outils qui rendent les systèmes complexes plus compréhensibles.",
      caption: 'Île Maurice → Montréal',
    },
    items: [
      { label: "Endurance", text: "La course est devenue une façon de construire de la discipline en dehors du travail." },
      { label: "Pâtisserie", text: "J’aime les projets qui demandent de la patience : pâtes feuilletées, gâteaux montés et petits détails." },
      { label: "Communauté", text: "À RFIUM, je m’occupe des médias et des événements pour les femmes en recherche et en informatique. C’est aussi pourquoi je participe à des événements comme JFFI et CAN/CWIC." },
    ],
    previewGallery: [
      {
        id: 'croissants',
        title: 'Croissants du week-end',
        category: '',
        description: 'Un de mes types de projets préférés : ce batch a testé une méthode de feuilletage sur deux jours. Du travail lent, précis, et chaque pliage en valait la peine.',
        alt: 'Croissants maison disposés près de tulipes roses.',
      },
      {
        id: 'entremet',
        title: 'Entremets framboise pistache',
        category: 'Entremets',
        description: "Construit en couches : biscuit dacquoise pistache, croustillant praliné pistache crêpe dentelle, chocolat blanc, insert framboise, mousse pistache et glaçage miroir framboise.",
        alt: 'Entremets rouge à la framboise et à la pistache avec une décoration soignée.',
      },
      {
        id: 'fraisier',
        title: 'Fraisier',
        category: 'Gâteau monté',
        description: "Une génoise imbibée d’un léger sirop earl grey, lavande et camomille, montée avec une crème mousseline classique, une chantilly mascarpone à la vanille et beaucoup de fraises fraîches.",
        alt: 'Fraisier aux fraises avec des couches visibles.',
      },
      {
        id: 'floral-cupcakes',
        title: 'Cupcakes floraux',
        category: 'Décoration',
        description: 'Ici, l’objectif était surtout le travail de pochage et du détail. J’aime les réalisations qui me permettent de travailler la texture et la décoration.',
        alt: 'Cupcakes décorés avec des fleurs pochées à la crème.',
      },
    ],
    gallery: [
      {
        id: 'croissants',
        title: 'Croissants du week-end',
        category: 'Pâte levée feuilletée',
        description: 'Un de mes types de projets préférés : ce batch a testé une méthode de feuilletage sur deux jours. Du travail lent, précis, et chaque pliage en valait la peine.',
        alt: 'Croissants maison disposés près de tulipes roses.',
      },
      {
        id: 'entremet',
        title: 'Entremets framboise pistache',
        category: 'Entremets',
        description: "Construit en couches : biscuit dacquoise pistache, croustillant praliné pistache crêpe dentelle, chocolat blanc, insert framboise, mousse pistache et glaçage miroir framboise.",
        alt: 'Entremets rouge à la framboise et à la pistache avec une décoration soignée.',
      },
      {
        id: 'fraisier',
        title: 'Fraisier',
        category: 'Gâteau monté',
        description: "Une génoise imbibée d’un léger sirop earl grey, lavande et camomille, montée avec une crème mousseline classique, une chantilly mascarpone à la vanille et beaucoup de fraises fraîches.",
        alt: 'Fraisier aux fraises avec des couches visibles.',
      },
      {
        id: 'floral-cupcakes',
        title: 'Cupcakes floraux',
        category: 'Décoration',
        description: 'Ici, l’objectif était surtout le travail de pochage et du détail. J’aime les réalisations qui me permettent de travailler la texture et la décoration.',
        alt: 'Cupcakes décorés avec des fleurs pochées à la crème.',
      },
      {
        id: 'berry-cake',
        title: 'Gâteau aux petits fruits',
        category: 'Gâteau de fête',
        description: "Une génoise vanille imbibée de sirop d'earl grey, montée avec un coulis de fraise et une chantilly subtilement parfumée à la vanille, décorée de fruits frais.",
        alt: 'Gâteau aux petits fruits avec de petites lumières en arrière-plan.',
      },
      {
        id: 'crepe-cake',
        title: 'Mille crêpes chocolat',
        category: 'Dessert monté',
        description: 'Des couches alternées de crème chocolat noir et de crème vanille pistache. Beaucoup de répétition, et toujours satisfaisant.',
        alt: 'Gâteau de crêpes en couches servi sur une assiette.',
      },
      {
        id: 'crepe-cake-slice',
        title: 'Intérieur du gâteau de crêpes',
        category: 'Coupe',
        description: "L’intérieur du mille crêpes — des couches alternées de crème chocolat noir et de crème vanille pistache.",
        alt: 'Part de gâteau de crêpes au chocolat montrant les couches.',
      },
      {
        id: 'patterned-cookies',
        title: 'Biscuits à motif',
        category: 'Biscuits',
        description: "Un projet pâtissier léger et amusant. Parfois, c’est tout ce qu’il faut.",
        alt: 'Biscuits maison avec un motif tacheté.',
      },
      {
        id: 'cream-puffs',
        title: 'Choux à la crème',
        category: 'Pâte à choux',
        description: "Des choux craquelin garnis de crème pâtissière. Un des formats que je reviens toujours chercher.",
        alt: 'Choux à la crème disposés sur un plateau.',
      },
      {
        id: 'cinnamon-rolls',
        title: 'Pause pâtisserie',
        category: 'Nature morte',
        description: 'Un moment plus calme qui résume assez bien comment j’aime passer mon temps libre.',
        alt: 'Une pause pâtisserie avec des viennoiseries et une tablette à côté.',
      },
      {
        id: 'milk-bread-rolls',
        title: 'Petits pains moelleux',
        category: 'Pain',
        description: 'Tous les projets ne doivent pas être spectaculaires. Parfois, le moelleux suffit.',
        alt: 'Petits pains moelleux près de tulipes et d’une tablette.',
      },
      {
        id: 'sesame-buns',
        title: 'Pains au sésame',
        category: 'Pain',
        description: 'Un projet de boulange simple, mais toujours satisfaisant.',
        alt: 'Pains au sésame maison sur un plateau.',
      },
      {
        id: 'custard-bakes',
        title: 'Cheesecake basque',
        category: 'Cheesecake',
        description: 'Une version plus légère au yaourt grec. Un peu rustique, très réconfortant.',
        alt: 'Cheesecake basque avec un dessus caramélisé.',
      },
      {
        id: 'trianon',
        title: 'Trianon chocolat',
        category: 'Entremets',
        description: "Base de biscuit dacquoise aux amandes, croustillant praliné feuillantine avec un pralin moitié amandes moitié noisettes, mousse chocolat et glaçage miroir au cacao.",
        alt: 'Entremets trianon au chocolat avec glaçage miroir cacao.',
      },
    ],
    page: {
      eyebrow: 'Notes de cuisine',
      heading: 'Galerie pâtisserie',
      intro: 'Une petite galerie organisée de projets de pâtisserie : pâtes feuilletées, gâteaux montés, pâte à choux, boulange et moments plus calmes en cuisine.',
      kitchenAccent: 'Quelques choses que je prépare',
      enduranceTitle: 'Endurance',
      enduranceText: "La course est devenue une façon de construire de la discipline en dehors du travail. J’ai complété un semi-marathon et je construis progressivement vers des objectifs d’endurance plus ambitieux, dont un futur 70.3 Ironman.",
      communityTitle: 'Communauté',
      communityText: "À RFIUM, je m’occupe des médias et des événements. Je tiens aux espaces où les étudiantes et les femmes en informatique se sentent soutenues et visibles. C’est aussi pourquoi je participe à des événements comme JFFI et CAN/CWIC.",
    },
  },

  contact: {
    eyebrow: 'Contact',
    heading: 'Discutons',
    sub: 'Collaboration de recherche, postes en ingénierie, ou une bonne conversation sur les outils IA.',
    email: 'vennila.sooben@umontreal.ca',
    github: 'github.com/mildshield14',
    linkedin: 'linkedin.com/in/vennilasooben',
    resumeLabel: 'CV',
    resumeFile: '/cv-fr.pdf',
  },

  footer: {
    copy: 'Vennila Sooben · 2026',
    made: 'Conçu et développé à la main.',
  },
}

export const content: Record<'en' | 'fr', Content> = { en, fr }
