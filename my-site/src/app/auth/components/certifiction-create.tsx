import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Award } from "lucide-react";
import { api } from "../../lib/api";

interface CreateCertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCertificationDialog = ({
  open,
  onOpenChange,
}: CreateCertificationDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    issues: "",
    date: "",
    skills: "",
    logo: "",
    credentialId: "",
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
              logo: text,
            }));
          }
        })
        .catch((err) => {
          console.warn("Falha ao ler o clipboard:", err);
        });
    }
  }, [open]);

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
    if (!formData.title || !formData.issues || !formData.date) {
      setError("Título, emissor e data são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      const certificationData = {
        title: formData.title,
        issues: formData.issues,
        date: new Date(formData.date),
        skills: skillsArray,
        logo: formData.logo,
        credentialId: formData.credentialId,
      };

      await api.post("/certifications", certificationData);

      setSuccess("Certificação criada com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Erro ao criar certificação"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      issues: "",
      date: "",
      skills: "",
      logo: "",
      credentialId: "",
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
              <Award size={24} className="text-primary" />
              <span>Criar Nova Certificação</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Título da Certificação"
                  placeholder="Nome da certificação"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Emissor"
                  placeholder="Instituição que emitiu (ex: Udemy, Alura)"
                  name="issues"
                  value={formData.issues}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Data de Emissão"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Habilidades"
                  placeholder="React, Node.js, Prisma (separadas por vírgula)"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  variant="bordered"
                />

                <Input
                  label="URL do Logo"
                  placeholder="Cole a URL ou faça upload (será colada automaticamente)"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  variant="bordered"
                />

                <Input
                  label="ID/URL da Credencial"
                  placeholder="https://credencial.com/verify/123456"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleChange}
                  variant="bordered"
                />

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
                isDisabled={loading}
              >
                Criar Certificação
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateCertificationDialog;
