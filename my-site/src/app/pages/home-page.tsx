import React from "react";
import { Link } from "react-router-dom";
import { Button, link, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import sec from "../assets/icons/sec.gif";
import python from "../assets/icons/python.gif";
import react from "../assets/icons/react.gif";
import typescript from "../assets/icons/typescript.gif";
import java from "../assets/icons/java.gif";
import profilephoto from "../assets/imgs/profile.png";

export const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-100vw)] flex flex-col">
      <section className="flex-grow flex items-center">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-block bg-primary-100 dark:bg-primary-900/15 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Security Information Analyst
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              Olá, meu nome é{" "}
              <span className="gradient-text">Leonardo Faustino</span>
            </h1>
            <p className="text-xl text-default-700 mb-8">
              Protejo o que é mais valioso no mundo digital: seus dados. Crio
              soluções de segurança inteligentes, confiáveis e robustas para
              garantir integridade, confidencialidade e tranquilidade no seu
              negócio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                to="/projects"
                color="primary"
                size="lg"
                radius="full"
                endContent={<Icon icon="lucide:arrow-right" />}
                className="font-medium"
              >
                Ver Projetos
              </Button>
              <Button
                as={Link}
                to="/contacts"
                variant="bordered"
                color="primary"
                size="lg"
                radius="full"
                className="font-medium"
              >
                Entrar em Contato
              </Button>
            </div>

            <Spacer y={12} />

            <div className="flex flex-wrap gap-8 items-center bg-primary-100 rounded-3xl dark:bg-primary-900/15">
              <p className="text-default-600 font-medium ml-6">Minha Stack</p>
              <div className="flex flex-wrap gap-5 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="flex items-center justify-center"
                >
                  <img src={sec} alt="gif" className="w-14 h-14" />
                  <img src={python} alt="gif" className="w-14 h-14" />
                  <img src={react} alt="gif" className="w-14 h-14" />
                  <img src={typescript} alt="gif" className="w-18 h-18" />
                  <img src={java} alt="gif" className="w-18 h-18" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-1 justify-center"
          >
            <div className="relative w-72 h-72 md:w-100 md:h-100 ml-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20 blur-3xl z-0"></div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <img
                  className="rounded-full w-64 h-64 md:w-100 md:h-100 object-cover border-4 border-white dark:border-content1"
                  alt="ProfilePhoto"
                  src={profilephoto}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
