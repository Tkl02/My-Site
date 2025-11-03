import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
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
    imageUrl: "",
    projectUrl: "",
    technologies: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      await api.post("/projects", projectData);

      setSuccess("Projeto criado com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar projeto");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
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
                  placeholder="React, TypeScript, Tailwind CSS (separadas por vírgula)"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  variant="bordered"
                  description="Separe as tecnologias por vírgula"
                />

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
