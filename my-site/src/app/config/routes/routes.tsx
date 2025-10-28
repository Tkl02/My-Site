import React from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "../../pages/about-page";
import { Contact } from "../../pages/contact-page";
import { Home } from "../../pages/home-page";
import { Projects } from "../../pages/project-page";
import { CertificationsPage } from "../../pages/certification-page";
import { Auth } from "../../pages/login-page";
import { Dashboard } from "../../auth/page/dashboard-page";

export const Rotas: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/logarusuario" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
