import { Career,Education } from "./interface";


export const education: Education[] = [
    {
      id: 1,
      institution: "Instituto Federal Goiano",
      degree: "Bacharel",
      field: "Ciências da Computção",
      startDate: "Sep 2020",
      endDate: "Jun 2025",
      description: "Especializado em segurança da informação, com abrangência em diversas áreas, com ênfase em Red Team.",
      logo: "logos:instituto-federal"
    }
  ];
  
export const career: Career[] = [
    {
      id: 1,
      company: "Peki Code",
      position: "Desenvolvedor Mobile com Flutter",
      startDate: "Jan 2022",
      endDate: null,
      responsibilities: [
        "Desenvolvimento de protótipos interativos utilizando Figma",
        "Criação e implementação de Front-end responsivo e escalável",
        "Atuação junto à diretoria de marketing e finanças em decisões estratégicas",
        "Mentoria de desenvolvedores juniores, além de realizar revisões de código para garantir qualidade e boas práticas"
      ],
      technologies: ["Flutter", "Dart", "Figma", "Metodos Ageis"],
      logo: ""
    },

    {
      id: 2,
      company: "HMO Tecnologias",
      position: "Analista em Segurança da Informação JR",
      startDate: "Dez 2024",
      endDate: null,
      responsibilities: [
        "Analisar, revisar e implementar políticas de segurança da informação",
        "Elaborar e revisar documentos para adequação às normas da LGPD",
        "Prestar consultoria especializada em segurança da informação para diferentes áreas da empresa"
      ],
      technologies: ["Info sec", "LGPD", "SIEM", "IDS/IPS"],
      logo: ""
    },
  ]
