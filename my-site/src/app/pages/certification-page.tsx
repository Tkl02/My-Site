import React, { useState, useEffect } from "react"; // 1. Importar hooks
import {
  Card,
  CardBody,
  Chip,
  Divider,
  Spinner, // 2. Importar Spinner
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, stagger } from "framer-motion";
import { fadeIn } from "../config/animation/motion-animate";
// 3. REMOVER import de mock
import { container, item } from "../config/animation/motion-animate";
import { api } from "../lib/api"; // 4. Importar nosso cliente API

// 5. Definir a interface (baseado no nosso backend)
interface Certification {
  id: number;
  title: string;
  issues: string;
  date: string; // Vem como string ISO (ex: "2025-06-02T00:00:00.000Z")
  credentialId: string;
  skills: string[];
  logo: string;
}

export const CertificationsPage: React.FC = () => {
  // 6. Criar estados para os dados da API
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 7. Buscar os dados da API quando o componente montar
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await api.get("/certifications");
        setCertifications(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Erro ao carregar certificações."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // 8. Função auxiliar para formatar a data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      timeZone: "UTC", // Garante que a data não mude por fuso horário
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="section-container">
      {/* ... Seu cabeçalho e descrição (sem alterações) ... */}
      <motion.div {...fadeIn(20)}>
        <h1 className="section-title">Certifications</h1>
        <p className="max-w-3xl mb-12 text-lg text-default-600">
          Certificações profissionais e cursos que concluí para aprimorar minhas
          habilidades e conhecimentos em diversas tecnologias e metodologias.
        </p>
      </motion.div>

      {/* 9. Lidar com os estados de Loading, Erro e Vazio */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <p className="text-lg text-danger">{error}</p>
        </div>
      ) : certifications.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-default-600">
            Nenhuma certificação encontrada.
          </p>
        </div>
      ) : (
        // 10. Seu grid de certificações (renderiza se tudo estiver OK)
        <motion.div
          className="grid grid-cols-1 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={item}>
              <Card className="card-hover dark:bg-gray-800">
                <CardBody className="p-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex items-center justify-center md:justify-start">
                      <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-content2 dark:bg-white/70">
                        <Icon icon={cert.logo} width={45} height={45} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-2 mb-2 md:flex-row md:items-center">
                        <h3 className="text-xl font-semibold text-foreground">
                          {cert.title}
                        </h3>
                        {/* 11. CORREÇÃO: Usar a data formatada */}
                        <Chip color="primary" variant="flat" size="sm">
                          {formatDate(cert.date)}
                        </Chip>
                      </div>
                      <p className="mb-3 text-default-600">{cert.issues}</p>

                      {/* 12. MELHORIA: Tornar credencial um link */}
                      <p className="mb-4 text-small text-default-500">
                        {cert.credentialId.startsWith("http") ? (
                          <a
                            href={cert.credentialId}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Ver Credencial
                          </a>
                        ) : (
                          `Credential: ${cert.credentialId}`
                        )}
                      </p>

                      <Divider className="my-3" />

                      <div className="flex flex-wrap gap-2 mt-3">
                        {cert.skills.map((skill) => (
                          <Chip
                            key={skill}
                            variant="flat"
                            size="sm"
                            className="text-xs dark:bg-primary-100"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
