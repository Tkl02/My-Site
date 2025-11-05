// src/components/admin/UploadImageDialog.tsx

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
      setSuccess("");
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
      formData.append("file", file);

      const response = await api.post("/upload", formData);

      const { imageUrl } = response.data;

      navigator.clipboard.writeText(imageUrl);
      setSuccess(
        `Upload com sucesso! A URL da imagem foi copiada para sua área de transferência: ${imageUrl}`
      );

      setFile(null);
      setPreview("");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Erro ao enviar imagem"
      );
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
    <Modal isOpen={open} onOpenChange={handleClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <Upload size={24} className="text-primary" />
              <span>Upload de Imagem</span>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="p-8 text-center transition-colors border-2 border-dashed rounded-lg cursor-pointer border-default-300 hover:border-primary">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    disabled={loading}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="object-cover mx-auto rounded-lg max-h-64"
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

                {file && !success && (
                  <div className="p-3 text-sm rounded-lg text-default-600 bg-default-100">
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
                {success ? "Fechar" : "Cancelar"}
              </Button>
              <Button
                color="primary"
                onPress={handleUpload}
                isLoading={loading}
                isDisabled={!file || loading || !!success}
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
