import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { Layout } from "../layout/layout";
import { AuthProvider } from "../config/context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <ToastProvider />
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
