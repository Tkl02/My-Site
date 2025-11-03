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
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies?: string[];
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
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (err: any) {
      setError("Erro ao carregar projetos");
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    const project = projects.find((p) => p.id === projectId);
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
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar projeto");
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
            <ModalHeader className="flex gap-2 items-center">
              <Trash2 size={24} className="text-danger" />
              <span>Deletar Projeto</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Card className="bg-danger-50 dark:bg-danger-100/10 border-danger">
                  <CardBody>
                    <div className="flex gap-3 items-start">
                      <AlertTriangle
                        size={24}
                        className="text-danger flex-shrink-0"
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
                        <SelectItem key={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </Select>

                    {selectedProject && (
                      <Card>
                        <CardBody className="space-y-2">
                          <h4 className="font-semibold text-lg">
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
                                      className="px-2 py-1 bg-primary-50 dark:bg-primary-100/10 text-primary text-xs rounded-full"
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
                  <div className="bg-danger-50 text-danger p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-success-50 text-success p-3 rounded-lg text-sm">
                    {success}
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
