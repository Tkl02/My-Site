export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  repoUrl: string;
  featured: boolean;
}

export interface Certification {
  id: number;
  title: string;
  issues: string;
  date: string;
  credentialId: string;
  skills: string[];
  logo: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
}

export interface Career {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  technologies: string[];
  logo: string;
  responsibilities: string[];
}

export interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: string;
}