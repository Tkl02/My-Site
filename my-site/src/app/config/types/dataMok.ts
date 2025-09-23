import { Certification } from "./interface";
import { Project } from "./interface";

  export const certification: Certification[] = [
    {
      id: 1,
      title: "introduction on the react",
      issues: "Udemy",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:udemy-icon",
    },
    {
      id: 2,
      title: "introduction on the cloud",
      issues: "aws",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:aws",
    },
    {
      id: 3,
      title: "introduction on the security",
      issues: "Coursera",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:coursera",
    },
  ];


export const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=1",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      repoUrl: "https://github.com",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A productivity application for managing tasks, projects, and team collaboration with real-time updates.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      repoUrl: "https://github.com",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts based on user location or search.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3",
      technologies: ["JavaScript", "Weather API", "CSS", "HTML"],

      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description:
        "A dashboard for tracking and analyzing social media performance across multiple platforms.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4",
      technologies: ["React", "D3.js", "Node.js", "Social APIs"],
      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 5,
      title: "Fitness Tracker",
      description:
        "An application for tracking workouts, nutrition, and fitness progress with data visualization.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5",
      technologies: ["React Native", "Firebase", "Chart.js"],
      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 6,
      title: "Recipe Finder",
      description:
        "A web application for discovering recipes based on available ingredients, dietary restrictions, and preferences.",
      image: "https://img.heroui.chat/image/food?w=600&h=400&u=1",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Recipe API"],
      repoUrl: "https://github.com",
      featured: false,
    },
  ];
