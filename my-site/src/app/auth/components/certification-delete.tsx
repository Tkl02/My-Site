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

interface DeleteCertificationDialogProps {
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

const DeleteCertificationDialog = ({
  open,
  onOpenChange,
}: DeleteCertificationDialogProps) => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCertId, setSelectedCertId] = useState<string>("");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
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
    setSelectedCert(cert || null);
    setError("");
  };

  const handleDelete = async () => {
    if (!selectedCertId) {
      setError("Selecione uma certificação");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.delete(`/certifications/${selectedCertId}`);

      setSuccess("Certificação deletada com sucesso!");
      fetchCertifications();
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao deletar certificação");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedCertId("");
    setSelectedCert(null);
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
              <span>Deletar Certificação</span>
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
                          Todos os dados da certificação serão permanentemente
                          removidos.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {loadingCerts ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <>
                    <Select
                      label="Selecione a Certificação para Deletar"
                      placeholder="Escolha uma certificação"
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

                    {selectedCert && (
                      <Card>
                        <CardBody className="space-y-2">
                          <h4 className="text-lg font-semibold">
                            {selectedCert.title}
                          </h4>
                          <p className="text-sm text-default-600">
                            <strong>Emissor:</strong> {selectedCert.issues}
                          </p>
                          <p className="text-sm text-default-600">
                            <strong>Data:</strong>{" "}
                            {new Date(selectedCert.date).toLocaleDateString(
                              "pt-BR",
                              { timeZone: "UTC" }
                            )}
                          </p>
                          {selectedCert.skills &&
                            selectedCert.skills.length > 0 && (
                              <p className="text-sm text-default-600">
                                <strong>Habilidades:</strong>{" "}
                                {selectedCert.skills.join(", ")}
                              </p>
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
                isDisabled={loading || !selectedCertId}
                startContent={<Trash2 size={18} />}
              >
                Deletar Certificação
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteCertificationDialog;
