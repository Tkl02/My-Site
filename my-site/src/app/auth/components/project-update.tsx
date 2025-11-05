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
  Checkbox,
} from "@heroui/react";
import { FolderOpen } from "lucide-react";
import { api } from "../../lib/api";

interface UpdateProjectDialogProps {
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
    featured: false,
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
    setError("");
    try {
      console.log("📥 Buscando projetos...");
      const response = await api.get("/projects");
      console.log("✅ Projetos carregados:", response.data.length, "projetos");
      setProjects(response.data);
    } catch (err: any) {
      console.error(
        "❌ Erro ao carregar projetos:",
        err.response?.status,
        err.response?.data
      );

      if (err.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");
      } else {
        setError(err.response?.data?.error || "Erro ao carregar projetos");
      }
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    const project = projects.find((p) => String(p.id) === projectId);

    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.image || "",
        projectUrl: project.repoUrl || "",
        technologies: project.technologies?.join(", ") || "",
        featured: project.featured || false,
      });
    }
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      type === "checkbox" && e.target instanceof HTMLInputElement;

    const newValue = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData({
      ...formData,
      [name]: newValue,
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

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        setError("Sessão expirada. Faça login novamente.");
        setTimeout(() => {
          window.location.href = "/logarusuario";
        }, 2000);
        return;
      }
    } catch (e) {
      console.error("⚠️ Erro ao validar token:", e);
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl,
        repoUrl: formData.projectUrl,
        featured: formData.featured,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),
      };

      console.log("📤 Enviando atualização:", {
        id: selectedProjectId,
        data: projectData,
      });

      const response = await api.put(
        `/projects/${selectedProjectId}`,
        projectData
      );

      console.log("✅ Resposta do backend:", response.data);

      setSuccess("Projeto atualizado com sucesso!");
      await fetchProjects();
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      console.error("❌ Erro completo:", err);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ Dados:", err.response?.data);
      console.error("❌ Headers enviados:", err.config?.headers);

      if (err.response?.status === 401) {
        setError("Sessão expirada. Você será redirecionado para o login.");
        setTimeout(() => {
          window.location.href = "/logarusuario";
        }, 2000);
      } else {
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Erro ao atualizar projeto"
        );
      }
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
      featured: false,
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
            <ModalHeader className="flex items-center gap-2">
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
                        <SelectItem key={String(project.id)}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </Select>

                    {selectedProjectId && (
                      <>
                        <Input
                          label="Título do Projeto"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          variant="bordered"
                        />
                        <Textarea
                          label="Descrição"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          variant="bordered"
                          minRows={4}
                        />
                        <Input
                          label="URL da Imagem"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleChange}
                          variant="bordered"
                        />
                        <Input
                          label="URL do Projeto"
                          name="projectUrl"
                          value={formData.projectUrl}
                          onChange={handleChange}
                          variant="bordered"
                        />
                        <Input
                          label="Tecnologias"
                          name="technologies"
                          value={formData.technologies}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Checkbox
                          name="featured"
                          isSelected={formData.featured}
                          onValueChange={(checked) =>
                            setFormData({ ...formData, featured: checked })
                          }
                        >
                          Marcar como projeto destaque
                        </Checkbox>
                      </>
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
