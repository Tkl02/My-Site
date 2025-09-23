import React from "react";

export interface Project{
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
