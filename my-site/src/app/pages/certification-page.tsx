import React from "react";
import { Card, CardBody, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, stagger } from "framer-motion";
import { Certification } from "../config/types/interface";


export const CertificationsPage: React.FC = () => {
  const certification: Certification[] = [
    {
      id: 1,
      title: "introduction on the react",
      issues: "Udemy",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:udemy-icon",
    },
    {
      id: 1,
      title: "introduction on the cloud",
      issues: "aws",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:aws",
    },
    {
      id: 1,
      title: "introduction on the security",
      issues: "Coursera",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:coursera",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const items = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <motion.div key={cert.id} variants={items}>
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
                      <h3 className="text-xl font-semibold text-foreground">{cert.title}</h3>
                      <Chip color="primary" variant="flat" size="sm">{cert.date}</Chip>
                    </div>
                      <p className="text-default-600 mb-3">{cert.issues}</p>
                      <p className="text-small text-default-500 mb-4">Credential: {cert.credentialId}</p>

                      <Divider className="my-3"/>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {cert.skills.map((skill) => (
                          <Chip key={skill} variant="flat" size="sm" className="text-xs dark:bg-primary-100">{skill}</Chip>
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
