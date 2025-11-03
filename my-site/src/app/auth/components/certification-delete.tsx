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
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
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
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar certificação");
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
            <ModalHeader className="flex gap-2 items-center">
              <Trash2 size={24} className="text-danger" />
              <span>Deletar Certificação</span>
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
                        <SelectItem key={cert.id}>{cert.title}</SelectItem>
                      ))}
                    </Select>

                    {selectedCert && (
                      <Card>
                        <CardBody className="space-y-2">
                          <h4 className="font-semibold text-lg">
                            {selectedCert.title}
                          </h4>
                          <p className="text-sm text-default-600">
                            <strong>Emissor:</strong> {selectedCert.issuer}
                          </p>
                          <p className="text-sm text-default-600">
                            <strong>Data:</strong>{" "}
                            {new Date(selectedCert.date).toLocaleDateString(
                              "pt-BR"
                            )}
                          </p>
                          {selectedCert.description && (
                            <p className="text-sm text-default-600">
                              {selectedCert.description}
                            </p>
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
