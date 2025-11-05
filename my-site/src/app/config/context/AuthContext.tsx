import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../../lib/api";

interface AuthContextType {
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chave para armazenar o token
const TOKEN_KEY = "auth_token";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa true para verificar token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ CORREÇÃO 1: Recuperar token do localStorage na inicialização
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedToken) {
          // Verificar se o token não está expirado (opcional mas recomendado)
          const isValid = validateToken(storedToken);

          if (isValid) {
            setAccessToken(storedToken);
            setIsAuthenticated(true);
            // Configurar token no Axios
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storedToken}`;
          } else {
            // Token expirado, limpar
            localStorage.removeItem(TOKEN_KEY);
          }
        }
      } catch (error) {
        console.error("Erro ao recuperar token:", error);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Função para validar token JWT (verifica expiração)
  const validateToken = (token: string): boolean => {
    try {
      // Decodificar o payload do JWT (parte do meio)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Converter para ms
      const currentTime = Date.now();

      return expirationTime > currentTime;
    } catch (error) {
      console.error("Erro ao validar token:", error);
      return false;
    }
  };

  // ✅ CORREÇÃO 2: Salvar token no localStorage ao fazer login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = response.data;

      // Salvar no estado
      setAccessToken(accessToken);
      setIsAuthenticated(true);

      // ✅ Salvar no localStorage para persistência
      localStorage.setItem(TOKEN_KEY, accessToken);

      // Configurar token no cabeçalho de todas as futuras requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Falha no login", error);
      throw new Error("Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CORREÇÃO 3: Limpar localStorage no logout
  const logout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);

    // Remover do localStorage
    localStorage.removeItem(TOKEN_KEY);

    // Remover do Axios
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        logout,
        isLoading,
        isAuthenticated,
      }}
    >
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
