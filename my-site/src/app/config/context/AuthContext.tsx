import React, { createContext, useState, useContext, ReactNode } from "react";
import { api } from "../../lib/api";

interface AuthContextType {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Esta função será chamada pelo seu formulário de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = response.data;
      setAccessToken(accessToken);

      // 🚨 Ponto-chave:
      // Define o token no cabeçalho de todas as futuras requisições do 'api'
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Falha no login", error);
      throw new Error("Credenciais inválidas."); // Joga o erro para o formulário
    } finally {
      setIsLoading(false);
    }
  };

  // (Vamos adicionar a lógica do /refresh-token aqui depois)

  const logout = () => {
    setAccessToken(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
