import React from "react";
import { Card, CardBody, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, stagger } from "framer-motion";
import { fadeIn } from "../config/animation/motion-animate";
import { certification } from "../config/types/dataMok";
import { container, item } from "../config/animation/motion-animate";

export const CertificationsPage: React.FC = () => {
  return (
    <div className="section-container">
      <motion.div {...fadeIn(20)}>
        <h1 className="section-title">Certifications</h1>
        <p className="text-default-600 text-lg max-w-3xl mb-12">
          Certificações profissionais e cursos que concluí para aprimorar minhas
          habilidades e conhecimentos em diversas tecnologias e metodologias.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {certification.map((cert) => (
          <motion.div key={cert.id} variants={item}>
            <Card className="card-hover dark:bg-gray-800">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex items-center justify-center md :justify-start">
                    <div className="w-16 h-16 flex items-center justify-center bg-content2 rounded-lg dark:bg-white/70">
                      <Icon icon={cert.logo} width={45} height={45} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {cert.title}
                      </h3>
                      <Chip color="primary" variant="flat" size="sm">
                        {cert.date}
                      </Chip>
                    </div>
                    <p className="text-default-600 mb-3">{cert.issues}</p>
                    <p className="text-small text-default-500 mb-4">
                      Credential: {cert.credentialId}
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
    </div>
  );
};
