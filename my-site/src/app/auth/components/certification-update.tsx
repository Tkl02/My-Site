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
import { FileCheck } from "lucide-react";
import { api } from "../../lib/api";

interface UpdateCertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
}

const UpdateCertificationDialog = ({
  open,
  onOpenChange,
}: UpdateCertificationDialogProps) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCertId, setSelectedCertId] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    imageUrl: "",
    credentialUrl: "",
  });
  const [loadingCerts, setLoadingCerts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (open) {
      fetchCertifications();
    }
  }, [open]);

  const fetchCertifications = async () => {
    setLoadingCerts(true);
    try {
      const response = await api.get("/certifications");
      setCertifications(response.data);
    } catch (err: any) {
      setError("Erro ao carregar certificações");
    } finally {
      setLoadingCerts(false);
    }
  };

  const handleCertSelect = (certId: string) => {
    setSelectedCertId(certId);
    const cert = certifications.find((c) => c.id === certId);
    if (cert) {
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        description: cert.description || "",
        imageUrl: cert.imageUrl || "",
        credentialUrl: cert.credentialUrl || "",
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
    if (!selectedCertId) {
      setError("Selecione uma certificação");
      return;
    }

    if (!formData.title || !formData.issuer || !formData.date) {
      setError("Título, emissor e data são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.put(`/certifications/${selectedCertId}`, formData);

      setSuccess("Certificação atualizada com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar certificação");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedCertId("");
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
              <FileCheck size={24} className="text-primary" />
              <span>Atualizar Certificação</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {loadingCerts ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <>
                    <Select
                      label="Selecione a Certificação"
                      placeholder="Escolha uma certificação para atualizar"
                      selectedKeys={selectedCertId ? [selectedCertId] : []}
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string;
                        handleCertSelect(key);
                      }}
                      variant="bordered"
                    >
                      {certifications.map((cert) => (
                        <SelectItem key={cert.id}>{cert.title}</SelectItem>
                      ))}
                    </Select>

                    {selectedCertId && (
                      <>
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
                isDisabled={loading || !selectedCertId}
              >
                Atualizar Certificação
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateCertificationDialog;
