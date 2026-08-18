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
  photoPath: "/images/photo.jpg",
};

// ============ LOGOS DES TECHNOLOGIES ============
// Les SVG sont servis depuis public/logos/<slug>.svg

export const techLogos = {
  html5: { label: "HTML5" },
  css3: { label: "CSS3" },
  javascript: { label: "JavaScript" },
  react: { label: "React" },
  bootstrap: { label: "Bootstrap" },
  tailwindcss: { label: "Tailwind CSS" },
  php: { label: "PHP" },
  laravel: { label: "Laravel" },
  python: { label: "Python" },
  mysql: { label: "MySQL" },
  mongodb: { label: "MongoDB" },
  docker: { label: "Docker" },
  git: { label: "Git" },
  github: { label: "GitHub" },
  wordpress: { label: "WordPress" },
  figma: { label: "Figma" },
} as const;

export type TechSlug = keyof typeof techLogos;

/** Logos qui gravitent autour du portrait du hero. */
export const orbitTechs: TechSlug[] = [
  "react",
  "laravel",
  "python",
  "docker",
  "javascript",
  "mysql",
];

/** Logos du bandeau défilant. */
export const marqueeTechs: TechSlug[] = [
  "html5",
  "css3",
  "javascript",
  "react",
  "bootstrap",
  "php",
  "laravel",
  "python",
  "mysql",
  "mongodb",
  "docker",
  "git",
  "wordpress",
];

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

export interface Skill {
  name: string;
  logo?: TechSlug;
}

export const skillCategories: { name: string; skills: Skill[] }[] = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css3" },
      { name: "JavaScript", logo: "javascript" },
      { name: "ReactJS", logo: "react" },
      { name: "Bootstrap", logo: "bootstrap" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "PHP", logo: "php" },
      { name: "Laravel", logo: "laravel" },
      { name: "Python", logo: "python" },
      { name: "POO" },
    ],
  },
  {
    name: "Base de données",
    skills: [
      { name: "MySQL", logo: "mysql" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "SQL" },
      { name: "PDO" },
    ],
  },
  {
    name: "API & Intégration",
    skills: [{ name: "API REST" }, { name: "Stripe" }, { name: "Ollama" }],
  },
  {
    name: "DevOps & Outils",
    skills: [
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "cPanel" },
    ],
  },
  {
    name: "CMS & Autres",
    skills: [
      { name: "WordPress", logo: "wordpress" },
      { name: "SEO" },
      { name: "Notions en cybersécurité" },
    ],
  },
];

export interface ProjectShot {
  /** Chemin de la capture dans public/projects/. */
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  type: string;
  year: string;
  role: string;
  duration: string;
  tagline: string;
  description: string;
  context: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  technologies: string[];
  stack: TechSlug[];
  metrics: { label: string; value: string }[];
  learnings: string[];
  shots: ProjectShot[];
  /** Teinte HSL de l'accent du projet (halo, bordures, badges). */
  accent: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "ai-code-analyzer",
    index: "01",
    name: "CodeLens — analyse de code par IA",
    category: "IA · Web App · Docker · API",
    type: "Projet personnel",
    year: "2026",
    role: "Conception & développement full stack",
    duration: "6 semaines",
    tagline:
      "Un étudiant colle son code, l'IA lui renvoie ses erreurs, une note de qualité et des pistes d'amélioration en quelques secondes.",
    description:
      "Plateforme web qui reçoit le code d'un étudiant, l'analyse avec un modèle d'IA exécuté localement via Ollama, puis renvoie un rapport structuré : erreurs, qualité, suggestions.",
    context:
      "Pendant ma formation, j'ai vu beaucoup d'étudiants bloqués des heures sur une erreur que personne n'avait le temps de relire avec eux. J'ai voulu leur donner un relecteur disponible 24h/24.",
    problem:
      "Les corrections manuelles sont lentes, inégales et arrivent souvent trop tard. Les outils existants sont anglophones, payants au mois et envoient le code sur des serveurs externes.",
    solution:
      "Une application web qui envoie le code à un modèle d'IA hébergé en local (Ollama), le tout conteneurisé avec Docker. Le résultat est exposé via une API REST et facturé à l'usage grâce à Stripe.",
    architecture: [
      "Frontend web : éditeur de code, upload de fichier et affichage du rapport",
      "API REST : validation de la requête, file d'attente et normalisation du rapport en JSON",
      "Service IA : modèle exécuté en local via Ollama, prompt spécialisé par langage",
      "Paiement : Stripe Checkout + webhook qui crédite le compte après le paiement",
      "Déploiement : chaque service dans son conteneur Docker, orchestré par docker-compose",
    ],
    features: [
      "Envoi de code par collage ou fichier",
      "Analyse automatique par IA",
      "Détection des erreurs et des risques",
      "Note de qualité du code",
      "Suggestions d'amélioration détaillées",
      "Historique des analyses",
      "Paiement en ligne via Stripe",
      "API REST documentée",
      "Architecture conteneurisée Docker",
    ],
    technologies: ["Python", "API REST", "Ollama", "Docker", "Stripe"],
    stack: ["python", "docker", "javascript", "git"],
    metrics: [
      { label: "Temps d'analyse moyen", value: "≈ 6 s" },
      { label: "Langages pris en charge", value: "3" },
      { label: "Services conteneurisés", value: "4" },
    ],
    learnings: [
      "Concevoir un prompt fiable et reproductible pour obtenir un rapport toujours structuré",
      "Isoler un modèle d'IA lourd dans son propre conteneur sans bloquer l'API",
      "Sécuriser un flux de paiement Stripe avec un webhook plutôt qu'une simple redirection",
    ],
    shots: [
      {
        src: "/projects/ai-code-analyzer-1.svg",
        caption: "Éditeur, rapport d'analyse de l'IA et suggestions générées",
      },
      {
        src: "/projects/ai-code-analyzer-2.svg",
        caption: "Formules d'abonnement et paiement sécurisé par Stripe",
      },
    ],
    accent: "265 85% 68%",
    featured: true,
  },
  {
    id: "gestion-stock",
    index: "02",
    name: "Application de gestion de stock",
    category: "Web App · Gestion",
    type: "Stage en entreprise",
    year: "2026",
    role: "Développeuse web (équipe Agile)",
    duration: "1 mois",
    tagline:
      "Piloter le stock, les fournisseurs, les ventes et les achats depuis une seule interface, au lieu de fichiers Excel dispersés.",
    description:
      "Application web complète de gestion de stock développée en entreprise : suivi des produits, des fournisseurs, des ventes et des achats, avec alertes de réapprovisionnement.",
    context:
      "Réalisée pendant mon stage, pour une équipe qui suivait encore son stock dans des classeurs Excel partagés par e-mail.",
    problem:
      "Aucune vision en temps réel du stock : ruptures découvertes trop tard, doubles saisies entre les ventes et les achats, et impossibilité de savoir ce que valait réellement le stock.",
    solution:
      "Une application web unique où chaque mouvement (achat, vente, retour) met le stock à jour immédiatement, avec un tableau de bord et des alertes automatiques sous le seuil défini par produit.",
    architecture: [
      "Modèle de données : produits, catégories, fournisseurs, mouvements de stock",
      "Écrans CRUD pour les produits, les fournisseurs, les ventes et les achats",
      "Calcul automatique du stock à partir des mouvements plutôt que d'un compteur modifiable",
      "Tableau de bord : indicateurs clés, graphiques mensuels et alertes de seuil",
      "Recette et mise en production avec l'équipe, en méthode Agile / Scrum",
    ],
    features: [
      "Gestion des produits et des catégories",
      "Gestion des fournisseurs",
      "Suivi des ventes",
      "Suivi des achats",
      "Alertes de réapprovisionnement",
      "Tableau de bord et graphiques",
      "Recherche et filtres",
      "Historique des mouvements",
    ],
    technologies: ["Analyse des besoins", "Développement", "Tests", "Mise en production", "Agile / Scrum"],
    stack: ["php", "laravel", "mysql", "bootstrap"],
    metrics: [
      { label: "Références gérées", value: "1 200+" },
      { label: "Modules livrés", value: "4" },
      { label: "Durée du projet", value: "1 mois" },
    ],
    learnings: [
      "Traduire un besoin métier flou en modèle de données clair avant d'écrire la première ligne de code",
      "Travailler en sprints avec des points quotidiens et livrer un module utilisable à chaque itération",
      "Accompagner la mise en production et la reprise des données existantes",
    ],
    shots: [
      {
        src: "/projects/gestion-stock-1.svg",
        caption: "Tableau de bord : indicateurs, graphiques et alertes de réapprovisionnement",
      },
      {
        src: "/projects/gestion-stock-2.svg",
        caption: "Catalogue produits avec recherche, filtres et niveaux de stock",
      },
    ],
    accent: "190 90% 55%",
  },
  {
    id: "ecommerce",
    index: "03",
    name: "Plateforme e-commerce",
    category: "Web App · E-commerce",
    type: "Projet de synthèse de fin de formation",
    year: "2025",
    role: "Conception & développement",
    duration: "8 semaines",
    tagline:
      "Une boutique en ligne complète, du catalogue au paiement, avec un back-office pour gérer les commandes.",
    description:
      "Conception et développement d'une plateforme e-commerce : catalogue, panier, tunnel de commande, paiement et administration des produits.",
    context:
      "Projet de synthèse de fin de formation : couvrir seule tout le cycle d'une application marchande, de la maquette à la mise en ligne.",
    problem:
      "Un site marchand doit inspirer confiance et rester simple : un panier qui se perd ou un tunnel de commande trop long, et la vente est perdue.",
    solution:
      "Un parcours en trois étapes seulement, un panier persistant, un paiement sécurisé et un back-office où l'administrateur suit les commandes et met à jour le catalogue.",
    architecture: [
      "Catalogue : catégories, fiches produits, recherche et filtres",
      "Panier persistant conservé entre les visites",
      "Tunnel de commande en 3 étapes : panier, livraison & paiement, confirmation",
      "Espace client : compte, adresses et historique des commandes",
      "Back-office : gestion des produits, des stocks et des statuts de commande",
    ],
    features: [
      "Catalogue et fiches produits",
      "Recherche et filtres",
      "Panier persistant",
      "Tunnel de commande en 3 étapes",
      "Paiement en ligne",
      "Compte client et historique",
      "Back-office administrateur",
      "Design responsive",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "Stripe"],
    stack: ["php", "laravel", "mysql", "javascript", "bootstrap"],
    metrics: [
      { label: "Étapes de commande", value: "3" },
      { label: "Rôles utilisateurs", value: "2" },
      { label: "Écrans conçus", value: "12" },
    ],
    learnings: [
      "Modéliser des commandes et des lignes de commande sans dépendre du prix courant du produit",
      "Sécuriser les formulaires et les accès au back-office",
      "Penser mobile d'abord : la majorité des visiteurs d'une boutique arrivent par téléphone",
    ],
    shots: [
      {
        src: "/projects/ecommerce-1.svg",
        caption: "Catalogue : grille de produits, tri et filtres",
      },
      {
        src: "/projects/ecommerce-2.svg",
        caption: "Tunnel de commande : livraison, paiement et récapitulatif",
      },
    ],
    accent: "330 85% 65%",
  },
  {
    id: "smile-detection",
    index: "04",
    name: "Détection de sourire en temps réel",
    category: "Python · Vision par ordinateur",
    type: "Projet Python",
    year: "2025",
    role: "Développement",
    duration: "2 semaines",
    tagline:
      "Un programme Python qui repère un visage dans le flux de la caméra, détecte le sourire et affiche son pourcentage de confiance.",
    description:
      "Programme de détection faciale capable d'identifier un sourire sur un flux vidéo en direct et d'afficher le niveau de confiance associé.",
    context:
      "Projet d'apprentissage de la vision par ordinateur : comprendre comment une machine passe d'une image brute à une information exploitable.",
    problem:
      "Détecter un sourire en direct impose deux contraintes : rester fluide image par image, et éviter les faux positifs dus à la lumière ou à l'angle du visage.",
    solution:
      "Un pipeline en deux temps — détection du visage, puis détection du sourire dans la zone du visage uniquement — avec un seuil de confiance réglable et un lissage sur plusieurs images.",
    architecture: [
      "Capture du flux de la webcam image par image",
      "Conversion en niveaux de gris et égalisation pour limiter l'effet de la lumière",
      "Détection du visage, puis recherche du sourire dans la région du visage",
      "Score de confiance lissé sur les dernières images pour éviter le clignotement",
      "Affichage en direct : cadre, pourcentage et statistiques de la session",
    ],
    features: [
      "Détection faciale en direct",
      "Identification du sourire",
      "Pourcentage de confiance",
      "Seuil de détection réglable",
      "Statistiques de session",
    ],
    technologies: ["Python", "OpenCV", "Vision par ordinateur"],
    stack: ["python", "git"],
    metrics: [
      { label: "Fluidité", value: "30 fps" },
      { label: "Latence par image", value: "≈ 12 ms" },
      { label: "Confiance moyenne", value: "88 %" },
    ],
    learnings: [
      "Réduire la zone de recherche pour gagner en performance sans perdre en précision",
      "Lisser un score de détection pour obtenir un affichage stable",
      "Régler un seuil en arbitrant entre faux positifs et détections manquées",
    ],
    shots: [
      {
        src: "/projects/smile-detection-1.svg",
        caption: "Flux caméra annoté, confiance en temps réel et statistiques de session",
      },
    ],
    accent: "35 95% 60%",
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
