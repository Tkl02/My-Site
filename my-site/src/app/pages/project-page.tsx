import React from "react";
import { Card, CardBody, CardFooter, Chip, button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Project } from "../config/types/interface";
import { P } from "framer-motion/dist/types.d-Cjd591yU";

const imageteste = "../assets/imgs/profile.png";

export const Projects: React.FC = () => {
  const [filter, setFilter] = React.useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=1",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      demoUrl: "https://example.com",
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
      demoUrl: "https://example.com",
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
      demoUrl: "https://example.com",
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
      demoUrl: "https://example.com",
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
      demoUrl: "https://example.com",
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
      demoUrl: "https://example.com",
      repoUrl: "https://github.com",
      featured: false,
    },
  ];

  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  const filteredProjects = filter
    ? projects.filter((project) => project.technologies.includes(filter))
    : projects;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
};
