import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  button,
  Link,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Project } from "../config/types/interface";
import { fadeIn } from "../config/animation/motion-animate";

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
      <motion.div {...fadeIn(20)}>
        <h1 className="section-title">Projetos</h1>
        <p className="text-default-600 text-lg max-w-3xl mb-8">
          Uma coleção de projetos que criei e que mostram minhas habilidades e
          experiência em várias tecnologias e domínios.
        </p>
      </motion.div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-default-600 mr-2">Filtrar por</span>
          <Button
            size="sm"
            radius="full"
            variant={filter === null ? "solid" : "flat"}
            color={filter === null ? "primary" : "default"}
            className="mb-2"
            onPress={() => setFilter(null)}
          >
            All
          </Button>
          {allTechnologies.map((techs) => (
            <Button
              key={techs}
              size="sm"
              radius="full"
              variant={filter === techs ? "solid" : "flat"}
              color={filter === techs ? "primary" : "default"}
              className="mb-2"
              onPress={() => setFilter(techs)}
            >
              {techs}
            </Button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={item}>
            <Card className="card-hover h-full">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Chip
                      color="primary"
                      variant="flat"
                      size="sm"
                      startContent={<Icon icon="lucide:star" />}
                    >
                      Featured
                    </Chip>
                  </div>
                )}
              </div>
              <CardBody className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-default-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      variant="flat"
                      size="sm"
                      className="text-xs"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  as={Link}
                  href={project.repoUrl}
                  target="_blank"
                  variant="light"
                  color="primary"
                  startContent={<Icon icon="lucide:github" />}
                  className="flex-1"
                >
                  Code
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
