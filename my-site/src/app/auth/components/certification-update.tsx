import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
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
  id: number;
  title: string;
  issues: string;
  date: string;
  skills: string[];
  logo: string;
  credentialId: string;
}

const UpdateCertificationDialog = ({
  open,
  onOpenChange,
}: UpdateCertificationDialogProps) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCertId, setSelectedCertId] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    issues: "",
    date: "",
    skills: "",
    logo: "",
    credentialId: "",
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
    setError("");
    try {
      const response = await api.get("/certifications");
      setCertifications(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao carregar certificações");
    } finally {
      setLoadingCerts(false);
    }
  };

  const handleCertSelect = (certId: string) => {
    setSelectedCertId(certId);
    const cert = certifications.find((c) => String(c.id) === certId);

    if (cert) {
      const formattedDate = cert.date
        ? new Date(cert.date).toISOString().split("T")[0]
        : "";

      setFormData({
        title: cert.title,
        issues: cert.issues,
        date: formattedDate,
        skills: cert.skills?.join(", ") || "",
        logo: cert.logo || "",
        credentialId: cert.credentialId || "",
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

      await api.put(`/certifications/${selectedCertId}`, certificationData);

      setSuccess("Certificação atualizada com sucesso!");
      fetchCertifications();
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao atualizar certificação");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedCertId("");
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
                        <SelectItem key={String(cert.id)}>
                          {cert.title}
                        </SelectItem>
                      ))}
                    </Select>

                    {selectedCertId && (
                      <>
                        <Input
                          label="Título da Certificação"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="Emissor"
                          name="issues"
                          value={formData.issues}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="Data de Emissão"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="Habilidades"
                          placeholder="React, Node.js (separadas por vírgula)"
                          name="skills"
                          value={formData.skills}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="URL do Logo"
                          name="logo"
                          value={formData.logo}
                          onChange={handleChange}
                          variant="bordered"
                        />

                        <Input
                          label="ID/URL da Credencial"
                          name="credentialId"
                          value={formData.credentialId}
                          onChange={handleChange}
                          variant="bordered"
                        />
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
