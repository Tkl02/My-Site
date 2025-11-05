import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../config/context/AuthContext";
import { Spinner } from "@heroui/react";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // ✅ Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Verificando autenticação..." />
      </div>
    );
  }

  // ✅ Se não autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to="/logarusuario" replace />;
  }

  // ✅ Se autenticado, renderizar a rota protegida
  return <Outlet />;
};
