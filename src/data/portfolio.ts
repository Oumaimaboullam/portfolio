// ============================================================
// DONNÉES DU PORTFOLIO — Oumaima Boullam
// Modifiez ce fichier pour mettre à jour le contenu du site.
// ============================================================

export const identity = {
  name: "Oumaima Boullam",
  firstName: "OUMAIMA",
  lastName: "BOULLAM",
  title: "Développeuse Web Full Stack",
  tagline: "Je conçois des applications web modernes, performantes et intelligentes.",
  description:
    "Développeuse Full Stack junior spécialisée en React, Laravel et Python, passionnée par la création de solutions web modernes, l'intégration d'API et les technologies d'IA.",
  location: "Marrakech, Maroc",
  email: "oumaimaboullam@gmail.com",
  phone: "06 88 21 68 08",
  availability: "Disponible pour opportunités",
  cvPath: "/cv-oumaima-boullam.pdf",
  photoPath: "/images/photo.jpg", // Remplacez ce fichier par votre photo
};

export const socials = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/oumaima-boullam",
  },
  {
    label: "GitHub",
    url: "", // [AJOUTER VOTRE LIEN GITHUB]
  },
  {
    label: "Email",
    url: "mailto:oumaimaboullam@gmail.com",
  },
];

export const heroTechs = ["React", "Laravel", "Python", "Docker"];

export const about = {
  paragraphs: [
    "Développeuse Full Stack junior, diplômée en Développement Digital, je conçois des solutions web modernes en combinant développement frontend, backend, bases de données et intégration d'API.",
    "Mon parcours m'a permis de travailler sur des projets concrets allant de la gestion de stock à l'e-commerce, en passant par une plateforme d'analyse de code utilisant l'intelligence artificielle.",
  ],
  highlights: [
    { index: "01", label: "Full Stack Development" },
    { index: "02", label: "API REST" },
    { index: "03", label: "Docker & IA" },
    { index: "04", label: "Web Applications" },
  ],
};

export const skillCategories = [
  {
    name: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "ReactJS", "Bootstrap"],
  },
  {
    name: "Backend",
    skills: ["PHP", "Laravel", "Python", "POO"],
  },
  {
    name: "Base de données",
    skills: ["MySQL", "MongoDB", "SQL", "PDO"],
  },
  {
    name: "API & Intégration",
    skills: ["API REST", "Stripe", "Ollama"],
  },
  {
    name: "DevOps & Outils",
    skills: ["Docker", "Git", "GitHub", "cPanel"],
  },
  {
    name: "CMS & Autres",
    skills: ["WordPress", "SEO", "Notions en cybersécurité"],
  },
];

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  type: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  featured?: boolean;
  caseStudy?: { title: string; content: string }[];
}

export const projects: Project[] = [
  {
    id: "ai-code-analyzer",
    index: "01",
    name: "Plateforme d'analyse de code par IA",
    category: "AI / Web Application / Docker / API",
    type: "Projet personnel",
    tagline:
      "Analyse intelligente du code pour aider les étudiants à identifier les erreurs et améliorer la qualité de leurs programmes.",
    description:
      "Création d'une interface web permettant à un étudiant en programmation d'envoyer son code pour une analyse automatique par une intelligence artificielle.",
    features: [
      "Envoi de code",
      "Analyse automatique",
      "Détection des erreurs",
      "Évaluation de la qualité du code",
      "Suggestions d'amélioration",
      "Intégration d'une IA via Ollama",
      "Paiement en ligne via Stripe",
      "API REST",
      "Architecture Docker",
    ],
    technologies: ["Docker", "API REST", "Ollama", "Stripe"],
    featured: true,
    caseStudy: [
      {
        title: "Overview",
        content:
          "Interface web permettant à un étudiant en programmation d'envoyer son code pour une analyse automatique par une intelligence artificielle.",
      },
      { title: "Problem", content: "[Ajouter les détails du problème]" },
      {
        title: "Solution",
        content:
          "Une plateforme web intégrant une IA locale via Ollama, exposée par une API REST, conteneurisée avec Docker, avec paiement en ligne via Stripe.",
      },
      {
        title: "Features",
        content:
          "Envoi de code, analyse automatique, détection des erreurs, évaluation de la qualité, suggestions d'amélioration, paiement en ligne.",
      },
      { title: "Technologies", content: "Docker · API REST · Ollama · Stripe" },
      { title: "Architecture", content: "[Ajouter le schéma d'architecture]" },
      { title: "Result", content: "[Ajouter les résultats du projet]" },
      { title: "Screenshots", content: "[Ajouter les captures d'écran]" },
      { title: "Links", content: "[Ajouter les liens GitHub / démo]" },
    ],
  },
  {
    id: "gestion-stock",
    index: "02",
    name: "Application de gestion de stock",
    category: "Web Application",
    type: "Stage — Projet professionnel",
    tagline:
      "Application web complète de gestion de stock, fournisseurs, ventes et achats.",
    description:
      "Conception et développement d'une application web de gestion de stock, fournisseurs, ventes et achats, réalisée dans le cadre de mon stage.",
    features: [
      "Gestion des stocks",
      "Gestion des fournisseurs",
      "Gestion des ventes",
      "Gestion des achats",
    ],
    technologies: ["Analyse des besoins", "Tests", "Mise en production", "Agile / Scrum"],
    caseStudy: [
      {
        title: "Overview",
        content:
          "Application web de gestion de stock, fournisseurs, ventes et achats, développée en entreprise dans le cadre d'un stage.",
      },
      { title: "Problem", content: "[Ajouter les détails du problème]" },
      {
        title: "Solution",
        content:
          "Une application web couvrant le cycle complet : stocks, fournisseurs, ventes et achats.",
      },
      {
        title: "Process",
        content:
          "Analyse des besoins, développement, tests, mise en production — en équipe et en méthodologie Agile / Scrum.",
      },
      { title: "Technologies", content: "[Ajouter les technologies utilisées]" },
      { title: "Screenshots", content: "[Ajouter les captures d'écran]" },
      { title: "Links", content: "[Ajouter les liens]" },
    ],
  },
  {
    id: "ecommerce",
    index: "03",
    name: "Plateforme E-commerce",
    category: "Web Application",
    type: "Projet de synthèse de fin de formation",
    tagline: "Conception et développement d'une plateforme e-commerce complète.",
    description:
      "Conception et développement d'une plateforme e-commerce dans le cadre du projet de synthèse de fin de formation.",
    features: ["Conception", "Développement", "Plateforme e-commerce", "Projet de synthèse"],
    technologies: ["[Ajouter les technologies]"],
    caseStudy: [
      {
        title: "Overview",
        content:
          "Plateforme e-commerce conçue et développée comme projet de synthèse de fin de formation.",
      },
      { title: "Features", content: "[Ajouter les fonctionnalités]" },
      { title: "Technologies", content: "[Ajouter les technologies]" },
      { title: "Screenshots", content: "[Ajouter les captures d'écran]" },
      { title: "Links", content: "[Ajouter GitHub / Live Demo]" },
    ],
  },
  {
    id: "smile-detection",
    index: "04",
    name: "Système de détection de sourire",
    category: "Python / Computer Vision",
    type: "Projet Python",
    tagline:
      "Détection faciale capable d'identifier un sourire et d'afficher le pourcentage de confiance associé.",
    description:
      "Développement d'un programme Python de détection faciale capable d'identifier un sourire et d'afficher le pourcentage de confiance associé.",
    features: [
      "Détection faciale",
      "Identification du sourire",
      "Pourcentage de confiance",
    ],
    technologies: ["Python", "Computer Vision", "Face Detection"],
    caseStudy: [
      {
        title: "Overview",
        content:
          "Programme Python de détection faciale identifiant un sourire avec un pourcentage de confiance.",
      },
      { title: "Technologies", content: "Python — Computer Vision" },
      { title: "Result", content: "[Ajouter le résultat / démonstration]" },
      { title: "Links", content: "[Ajouter le lien GitHub]" },
    ],
  },
];

export const experiences = [
  {
    role: "Stagiaire en développement web",
    place: "Marrakech, Maroc",
    period: "2026 — 1 mois",
    description:
      "Conception et développement d'une application web de gestion de stock, fournisseurs, ventes et achats.",
    points: [
      "Analyse des besoins",
      "Développement",
      "Tests",
      "Mise en production",
      "Méthode Agile / Scrum",
      "Travail en équipe",
    ],
  },
  {
    role: "Freelance — SEO & WordPress",
    place: "À distance",
    period: "2026 — 1 mois",
    description: "",
    points: [
      "Optimisation SEO de sites WordPress",
      "Gestion et mise à jour du contenu éditorial",
      "Relation directe avec les clients",
    ],
  },
];

export const education = [
  {
    period: "2024 — 2026",
    title: "Technicien Spécialisé en Développement Digital",
    detail: "Formation axée sur le développement web Full Stack.",
  },
  {
    period: "2023 — 2024",
    title: "Études en Sciences — 1ère année",
    detail: "Faculté des Sciences Semlalia, Marrakech.",
  },
  {
    period: "2022 — 2023",
    title: "Baccalauréat Scientifique",
    detail: "Option Physique-Chimie.",
  },
];

export const qualities = [
  "Sens de l'initiative",
  "Force de proposition",
  "Résolution de problèmes",
  "Communication",
  "Esprit d'analyse",
  "Rigueur",
  "Organisation",
  "Apprentissage rapide",
  "Travail en équipe",
  "Responsabilité",
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Français", level: "B1" },
  { name: "Anglais", level: "A2" },
];

export const services = [
  {
    title: "Web Development",
    description: "Conception et développement d'applications web modernes.",
  },
  {
    title: "Full Stack Development",
    description:
      "Développement frontend et backend avec intégration de bases de données et APIs.",
  },
  {
    title: "API & Intégrations",
    description: "Intégration d'API REST et services externes.",
  },
  {
    title: "IA & Technologies modernes",
    description:
      "Intégration de solutions d'intelligence artificielle dans des applications web.",
  },
];

export const navLinks = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Expérience", href: "#experience" },
  { label: "Formation", href: "#education" },
  { label: "Contact", href: "#contact" },
];
