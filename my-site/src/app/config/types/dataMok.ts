import { Certification, Project, Career,Education } from "./interface";

  // dados mocados para test da certificationPage

  export const certification: Certification[] = [
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
      id: 2,
      title: "introduction on the cloud",
      issues: "aws",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:aws",
    },
    {
      id: 3,
      title: "introduction on the security",
      issues: "Coursera",
      date: "02 june 2025",
      credentialId: "https://udemy.com/dfjhlkjdshf",
      skills: ["react", "node", "mongo", "heroui"],
      logo: "logos:coursera",
    },
  ];

  // dados mocado para teste da projectPage

export const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=1",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      repoUrl: "https://github.com",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A productivity application for managing tasks, projects, and team collaboration with real-time updates.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=2",
      technologies: ["React", "Firebase", "Tailwind CSS", "Redux"],
      repoUrl: "https://github.com",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A weather application that displays current conditions and forecasts based on user location or search.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=3",
      technologies: ["JavaScript", "Weather API", "CSS", "HTML"],

      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description:
        "A dashboard for tracking and analyzing social media performance across multiple platforms.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=4",
      technologies: ["React", "D3.js", "Node.js", "Social APIs"],
      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 5,
      title: "Fitness Tracker",
      description:
        "An application for tracking workouts, nutrition, and fitness progress with data visualization.",
      image: "https://img.heroui.chat/image/dashboard?w=600&h=400&u=5",
      technologies: ["React Native", "Firebase", "Chart.js"],
      repoUrl: "https://github.com",
      featured: false,
    },
    {
      id: 6,
      title: "Recipe Finder",
      description:
        "A web application for discovering recipes based on available ingredients, dietary restrictions, and preferences.",
      image: "https://img.heroui.chat/image/food?w=600&h=400&u=1",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Recipe API"],
      repoUrl: "https://github.com",
      featured: false,
    },
  ];

  // dados mocados para teste da about page

export const education: Education[] = [
    {
      id: 1,
      institution: "Stanford University",
      degree: "Master's Degree",
      field: "Computer Science",
      startDate: "Sep 2018",
      endDate: "Jun 2020",
      description: "Specialized in Artificial Intelligence and Machine Learning with a focus on natural language processing and computer vision applications.",
      logo: "logos:stanford-university"
    },
    {
      id: 2,
      institution: "MIT",
      degree: "Bachelor's Degree",
      field: "Software Engineering",
      startDate: "Sep 2014",
      endDate: "Jun 2018",
      description: "Graduated with honors. Participated in multiple hackathons and research projects focused on web technologies and distributed systems.",
      logo: "logos:mit"
    }
  ];
  
export const career: Career[] = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Developer",
      startDate: "Jan 2022",
      endDate: null,
      responsibilities: [
        "Lead a team of 5 developers working on Google Cloud Platform's web interface",
        "Implemented new features and optimized performance, reducing load time by 40%",
        "Collaborated with design and product teams to create intuitive user experiences",
        "Mentored junior developers and conducted code reviews"
      ],
      technologies: ["React", "TypeScript", "GraphQL", "Jest", "Cypress"],
      logo: "logos:google-icon"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Full Stack Developer",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      responsibilities: [
        "Developed and maintained features for Microsoft Teams",
        "Built RESTful APIs and microservices using Node.js and .NET Core",
        "Implemented real-time communication features using WebSockets",
        "Participated in agile development processes and sprint planning"
      ],
      technologies: ["React", "Node.js", ".NET Core", "SQL Server", "Azure"],
      logo: "logos:microsoft-icon"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Software Development Engineer",
      startDate: "Jul 2018",
      endDate: "Feb 2020",
      responsibilities: [
        "Worked on Amazon's e-commerce platform frontend",
        "Optimized website performance and user experience",
        "Implemented A/B testing framework for new features",
        "Collaborated with cross-functional teams to deliver projects on schedule"
      ],
      technologies: ["JavaScript", "React", "AWS", "Java", "DynamoDB"],
      logo: "logos:amazon"
    }
  ];