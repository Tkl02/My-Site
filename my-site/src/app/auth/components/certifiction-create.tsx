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
    issuer: "",
    date: "",
    description: "",
    imageUrl: "",
    credentialUrl: "",
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
    if (!formData.title || !formData.issuer || !formData.date) {
      setError("Título, emissor e data são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/certifications", formData);

      setSuccess("Certificação criada com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar certificação");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      issuer: "",
      date: "",
      description: "",
      imageUrl: "",
      credentialUrl: "",
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
                  placeholder="Instituição que emitiu"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Input
                  label="Data de Emissão"
                  placeholder="DD/MM/YYYY"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  isRequired
                  variant="bordered"
                />

                <Textarea
                  label="Descrição"
                  placeholder="Descreva a certificação..."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="bordered"
                  minRows={3}
                />

                <Input
                  label="URL da Imagem"
                  placeholder="https://example.com/certificate.jpg"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  variant="bordered"
                />

                <Input
                  label="URL da Credencial"
                  placeholder="https://credencial.com/verify/123456"
                  name="credentialUrl"
                  value={formData.credentialUrl}
                  onChange={handleChange}
                  variant="bordered"
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
