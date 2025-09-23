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
import { projects } from "../config/types/dataMok";
import { fadeIn } from "../config/animation/motion-animate";

const imageteste = "../assets/imgs/profile.png";

export const Projects: React.FC = () => {
  const [filter, setFilter] = React.useState<string | null>(null);

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
