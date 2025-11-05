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
  Checkbox,
} from "@heroui/react";
import { FolderPlus } from "lucide-react";
import { api } from "../../lib/api";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog = ({
  open,
  onOpenChange,
}: CreateProjectDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    repoUrl: "",
    technologies: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (open) {
      navigator.clipboard
        .readText()
        .then((text) => {
          if (text && (text.startsWith("http") || text.startsWith("https:"))) {
            setFormData((prevData) => ({
              ...prevData,
              image: text,
            }));
          }
        })
        .catch((err) => {
          console.warn("Falha ao ler o clipboard (permissão?):", err);
        });
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;

    const isCheckbox =
      type === "checkbox" && target instanceof HTMLInputElement;

    setFormData({
      ...formData,
      [name]: isCheckbox ? (target as HTMLInputElement).checked : value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      setError("Título e descrição são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");

      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: technologiesArray,
        image: formData.image,
        repoUrl: formData.repoUrl,
        featured: formData.featured,
      };

      await api.post("/projects", projectData);

      setSuccess("Projeto criado com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Erro ao criar projeto"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      repoUrl: "",
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
              <FolderPlus size={24} className="text-primary" />
              <span>Criar Novo Projeto</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
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
                  placeholder="Cole a URL ou faça upload (ela será colada automaticamente)"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="URL do Projeto"
                  placeholder="https://github.com/usuario/projeto"
                  name="repoUrl"
                  value={formData.repoUrl}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Tecnologias"
                  placeholder="React, TypeScript, Tailwind CSS (separadas por vírgula)"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  isRequired
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
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={loading}
                isDisabled={loading}
              >
                Criar Projeto
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectDialog;
