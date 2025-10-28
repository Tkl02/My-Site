import React from "react";
import { Education, Career } from "../config/types/interface";
import { fadeIn, container, item } from "../config/animation/motion-animate";
import { delay, motion } from "framer-motion";
import { Avatar, Card, CardBody, Divider, Tab, Tabs } from "@heroui/react";
import profilephoto from "../assets/imgs/profile.png";
import { Icon } from "@iconify/react";
import { SkillCategoryProps } from "../config/types/interface";
import { pph1, pph2, pph3, pph4 } from "../config/types/dataAbout";
import { education, career } from "../config/types/dataMok";

export const About: React.FC = () => {
  const [selected, setSelected] = React.useState("Sobre");

  return (
    <div className="section-container">
      <motion.div {...fadeIn(-20)}>
        <h1 className="section-title">Sobre Mim</h1>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div {...fadeIn(-20)} transition={{ delay: 0.2 }}>
          <div className="sticky top-20">
            <div className="flex flex-col items-center mb-6">
              <Avatar
                src={profilephoto}
                className="w-40 h-40 text-large mb-4"
              />
              <h2 className="text-2xl font-bold">Leonardo Faustino</h2>
              <p className="text-default-600">
                Analista em segurança da Informação
              </p>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              {[
                "lucide:github",
                "lucide:linkedin",
                "lucide:instagram",
                "lucide:mail",
              ].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-content2 text-default-600 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <Icon icon={icon} width={20} height={20} />
                </div>
              ))}
            </div>
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">skills</h3>
                <div className="space-y-3">
                  <SkillCategory
                    title="Frontend"
                    skills={["react", "front-end", "typescript"]}
                    icon="lucide:layout"
                  />
                  <SkillCategory
                    title="Backend"
                    skills={["express", "node", "typescript"]}
                    icon="lucide:server"
                  />
                  <SkillCategory
                    title="DataBase"
                    skills={["mongo", "mysql", "postgress"]}
                    icon="lucide:database"
                  />
                  <SkillCategory
                    title="Devops"
                    skills={["react", "front-end", "typescript"]}
                    icon="lucide:code"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          {...fadeIn()}
          transition={{ delay: 0.2 }}
        >
          <Tabs
            aria-label="Tabs sobre mim"
            selectedKey={selected}
            onSelectionChange={setSelected as any}
            variant="underlined"
            color="primary"
            classNames={{
              tabList: "gap-6",
              cursor: "bg-primary",
              tab: "max-w-fit px-0 h-12",
            }}
          >
            <Tab
              key="Sobre"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" />
                  <span>Sobre</span>
                </div>
              }
            >
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Olá, meu nome é Leonardo Faustino
                  </h2>
                  <p className="text-default-600 mb-4">{pph1}</p>
                  <p className="text-default-600 mb-4">{pph2}</p>
                  <p className="text-default-600 mb-4">{pph3}</p>
                  <p className="text-default-600 mb-4">{pph4}</p>
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="Education"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:graduation-cap" />
                  <span>Educação </span>
                </div>
              }
            >
              <motion.div variants={container} className="space-y-6">
                {education.map((edu) => (
                  <motion.div key={edu.id} variants={item}>
                    <Card>
                      <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 flex items-center justify-center bg-content2 rounded-lg">
                              <Icon icon={edu.logo} width={40} height={40} />
                            </div>
                          </div>
                          <div className="flex-row">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <h3 className="text-xl font-semibold">
                                {edu.institution}
                              </h3>
                              <div className="text-default-500 text-sm">
                                {edu.startDate} - {edu.endDate}
                              </div>
                            </div>
                            <div className="text-primary font-medium mb-2">
                              {edu.degree} in {edu.field}
                            </div>
                            <p className="text-default-600">
                              {edu.description}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </Tab>
            <Tab
              key="career"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:briefcase" />
                  <span>Career</span>
                </div>
              }
            >
              <motion.div variants={container} className="space-y-6">
                {career.map((job) => (
                  <motion.div key={job.id} variants={item}>
                    <Card>
                      <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 flex items-center justify-center bg-content2 rounded-lg">
                              <Icon icon={job.logo} width={40} height={40} />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <h3 className="text-xl font-semibold">
                                {job.company}
                              </h3>
                              <div className="text-default-500 text-sm">
                                {job.startDate} - {job.endDate || "Presente"}
                              </div>
                            </div>
                            <div className="text-primary font-medium mb-3">
                              {job.position}
                            </div>
                            <h4 className="text-sm font-semibold text-default-700 mb-2">
                              Responsabilidades
                            </h4>
                            <ul className="list-disc list-inside text-default-600 mb-4 space-y-1">
                              {job.responsibilities.map((resp, index) => (
                                <li key={index} className="text-default-600">
                                  {resp}
                                </li>
                              ))}
                            </ul>
                            <Divider className="my-3" />
                            <div className="flex flex-wrap gap-2 mt-2">
                              {job.technologies.map((tech) => (
                                <div
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-content2 rounded-full text-default-700"
                                >
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </Tab>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  skills,
  icon,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon icon={icon} className="text-primary" />
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-6 pl-6">
        {skills.map((skill) => (
          <div
            key={skill}
            className="text-xs px-2 py-1 bg-content2 rounded-full text-default-700 dark:bg-primary-900/15"
          >
            {skill}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};
