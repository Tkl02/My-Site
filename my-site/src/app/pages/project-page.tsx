import React, { useState, useEffect } from "react"; // 1. Importar hooks
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  // 'button' está importado incorretamente, 'Button' é o correto
  Link,
  Button,
  Spinner, // 2. Importar o Spinner para o loading
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// 3. REMOVER import de mock
import { api } from "../lib/api"; // 4. Importar nosso cliente API
import { fadeIn } from "../config/animation/motion-animate";

// 5. Definir a interface (baseado no nosso backend)
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  repoUrl: string;
  technologies: string[];
  featured: boolean;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = React.useState<string | null>(null);

  // 6. Criar estados para os dados da API
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 7. Buscar os dados da API quando o componente montar
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Nossa API pública não precisa de autenticação
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Erro ao carregar projetos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // O resto da sua lógica de filtro funciona perfeitamente com o estado!
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  const filteredProjects = filter
    ? projects.filter((project) => project.technologies.includes(filter))
    : projects;

  // Suas animações (container e item) estão perfeitas
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
      {/* ... Seu cabeçalho e descrição ... */}
      <motion.div {...fadeIn(20)}>
        <h1 className="section-title">Projetos</h1>
        <p className="max-w-3xl mb-8 text-lg text-default-600">
          Uma coleção de projetos que criei e que mostram minhas habilidades e
          experiência em várias tecnologias e domínios.
        </p>
      </motion.div>

      {/* ... Seus botões de filtro (estão perfeitos) ... */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-default-600">Filtrar por</span>
          {/* Botão 'All' */}
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
          {/* Botões de 'techs' */}
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

      {/* 8. Lidar com os estados de Loading, Erro e Vazio */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <p className="text-lg text-danger">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-default-600">Nenhum projeto encontrado.</p>
        </div>
      ) : (
        // 9. Seu grid de projetos (renderiza se tudo estiver OK)
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="h-full card-hover">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-48"
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
                  <h3 className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-default-600">{project.description}</p>
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
      )}
    </div>
  );
};
