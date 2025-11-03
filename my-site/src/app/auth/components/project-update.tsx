import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { FolderOpen } from "lucide-react";
import { api } from "../../lib/api";

interface UpdateProjectDialogProps {
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

const UpdateProjectDialog = ({
  open,
  onOpenChange,
}: UpdateProjectDialogProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    technologies: "",
  });
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
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || "",
        projectUrl: project.projectUrl || "",
        technologies: project.technologies?.join(", ") || "",
      });
    }
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    if (!selectedProjectId) {
      setError("Selecione um projeto");
      return;
    }

    if (!formData.title || !formData.description) {
      setError("Título e descrição são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),
      };

      await api.put(`/projects/${selectedProjectId}`, projectData);

      setSuccess("Projeto atualizado com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar projeto");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedProjectId("");
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
      technologies: "",
    });
    setError("");
    setSuccess("");
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2 items-center">
              <FolderOpen size={24} className="text-primary" />
              <span>Atualizar Projeto</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {loadingProjects ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <>
                    <Select
                      label="Selecione o Projeto"
                      placeholder="Escolha um projeto para atualizar"
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

                    {selectedProjectId && (
                      <>
                        <Input
                          label="Título do Projeto"
                          placeholder="Nome do projeto"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          isRequired
                          variant="bordered"
                        />

                        <Textarea
                          label="Descrição"
                          placeholder="Descreva o projeto..."
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          isRequired
                          variant="bordered"
                          minRows={4}
                        />

                        <Input
                          label="URL da Imagem"
                          placeholder="https://example.com/image.jpg"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="URL do Projeto"
                          placeholder="https://github.com/usuario/projeto"
                          name="projectUrl"
                          value={formData.projectUrl}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="Tecnologias"
                          placeholder="React, TypeScript, Tailwind CSS"
                          name="technologies"
                          value={formData.technologies}
                          onChange={handleChange}
                          variant="bordered"
                          description="Separe as tecnologias por vírgula"
                        />
                      </>
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
              <Button color="danger" variant="light" onPress={handleClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={loading}
                isDisabled={loading || !selectedProjectId}
              >
                Atualizar Projeto
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateProjectDialog;
