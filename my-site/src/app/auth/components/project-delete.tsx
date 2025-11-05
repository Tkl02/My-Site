import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Spinner,
  Card,
  CardBody,
} from "@heroui/react";
import { Trash2, AlertTriangle } from "lucide-react";
import { api } from "../../lib/api";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  repoUrl: string;
  technologies: string[];
  featured: boolean;
}

const DeleteProjectDialog = ({
  open,
  onOpenChange,
}: DeleteProjectDialogProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (open) {
      fetchProjects();
    }
  }, [open]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    setError("");
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar projetos");
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    const project = projects.find((p) => String(p.id) === projectId);
    setSelectedProject(project || null);
    setError("");
  };

  const handleDelete = async () => {
    if (!selectedProjectId) {
      setError("Selecione um projeto");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.delete(`/projects/${selectedProjectId}`);

      setSuccess("Projeto deletado com sucesso!");
      fetchProjects();
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao deletar projeto");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedProjectId("");
    setSelectedProject(null);
    setError("");
    setSuccess("");
    onOpenChange(false);
  };

  return (
    <Modal isOpen={open} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <Trash2 size={24} className="text-danger" />
              <span>Deletar Projeto</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Card className="bg-danger-50 dark:bg-danger-100/10 border-danger">
                  <CardBody>
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        size={24}
                        className="flex-shrink-0 text-danger"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-danger">
                          Atenção: Esta ação é irreversível!
                        </p>
                        <p className="text-sm text-danger-600">
                          Todos os dados do projeto serão permanentemente
                          removidos.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {loadingProjects ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <>
                    <Select
                      label="Selecione o Projeto para Deletar"
                      placeholder="Escolha um projeto"
                      selectedKeys={
                        selectedProjectId ? [selectedProjectId] : []
                      }
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        handleProjectSelect(key);
                      }}
                      variant="bordered"
                    >
                      {projects.map((project) => (
                        <SelectItem key={String(project.id)}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </Select>

                    {selectedProject && (
                      <Card>
                        <CardBody className="space-y-2">
                          <h4 className="text-lg font-semibold">
                            {selectedProject.title}
                          </h4>
                          <p className="text-sm text-default-600">
                            {selectedProject.description}
                          </p>
                          {selectedProject.technologies &&
                            selectedProject.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies.map(
                                  (tech, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-100/10 text-primary"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                        </CardBody>
                      </Card>
                    )}
                  </>
                )}

                {error && (
                  <div className="p-3 text-sm rounded-lg bg-danger-50 text-danger">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 text-sm rounded-lg bg-success-50 text-success">
                    S {success}
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={handleClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={loading}
                isDisabled={loading || !selectedProjectId}
                startContent={<Trash2 size={18} />}
              >
                Deletar Projeto
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteProjectDialog;
