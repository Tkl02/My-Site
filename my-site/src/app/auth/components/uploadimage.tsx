import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { api } from "../../lib/api";

interface UploadImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadImageDialog = ({ open, onOpenChange }: UploadImageDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Por favor, selecione uma imagem");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Imagem enviada com sucesso!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao enviar imagem");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview("");
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
              <Upload size={24} className="text-primary" />
              <span>Upload de Imagem</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-default-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-default-600">
                          Clique para escolher outra imagem
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon
                          size={64}
                          className="mx-auto text-default-400"
                        />
                        <div>
                          <p className="text-lg font-semibold text-default-700">
                            Clique para fazer upload
                          </p>
                          <p className="text-sm text-default-500">
                            PNG, JPG, WEBP até 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {file && (
                  <div className="text-sm text-default-600 bg-default-100 p-3 rounded-lg">
                    <p>
                      <strong>Arquivo:</strong> {file.name}
                    </p>
                    <p>
                      <strong>Tamanho:</strong>{" "}
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
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
                onPress={handleUpload}
                isLoading={loading}
                isDisabled={!file || loading}
              >
                Upload
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UploadImageDialog;
