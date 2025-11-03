// Exemplos de requisições da API usadas no Dashboard
// Este arquivo serve como referência para desenvolvimento

import { api } from "../lib/api";

// =====================================
// 📤 UPLOAD DE IMAGEM
// =====================================

export const uploadImageExample = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log("Upload bem-sucedido:", response.data);
    // Resposta esperada: { url: "https://..." }
    
    return response.data;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw error;
  }
};

// =====================================
// 📁 PROJETOS - CRUD
// =====================================

// GET - Listar todos os projetos
export const getProjectsExample = async () => {
  try {
    const response = await api.get("/projects");
    console.log("Projetos:", response.data);
    
    // Resposta esperada:
    // [
    //   {
    //     id: "1",
    //     title: "Meu Projeto",
    //     description: "Descrição...",
    //     imageUrl: "https://...",
    //     projectUrl: "https://github.com/...",
    //     technologies: ["React", "TypeScript"]
    //   }
    // ]
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
};

// POST - Criar novo projeto
export const createProjectExample = async () => {
  const projectData = {
    title: "Novo Projeto Incrível",
    description: "Este é um projeto de exemplo usando React e TypeScript",
    imageUrl: "https://example.com/project-image.jpg",
    projectUrl: "https://github.com/usuario/projeto",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  };

  try {
    const response = await api.post("/projects", projectData);
    console.log("Projeto criado:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    throw error;
  }
};

// PUT - Atualizar projeto existente
export const updateProjectExample = async (projectId: string) => {
  const updatedData = {
    title: "Projeto Atualizado",
    description: "Descrição atualizada do projeto",
    imageUrl: "https://example.com/new-image.jpg",
    projectUrl: "https://github.com/usuario/projeto-v2",
    technologies: ["React", "TypeScript", "Next.js"],
  };

  try {
    const response = await api.put(`/projects/${projectId}`, updatedData);
    console.log("Projeto atualizado:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    throw error;
  }
};

// DELETE - Deletar projeto
export const deleteProjectExample = async (projectId: string) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    console.log("Projeto deletado:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
};

// =====================================
// 🏆 CERTIFICAÇÕES - CRUD
// =====================================

// GET - Listar todas as certificações
export const getCertificationsExample = async () => {
  try {
    const response = await api.get("/certifications");
    console.log("Certificações:", response.data);
    
    // Resposta esperada:
    // [
    //   {
    //     id: "1",
    //     title: "AWS Certified",
    //     issuer: "Amazon",
    //     date: "2024-01-15",
    //     description: "Certificação em Cloud Computing",
    //     imageUrl: "https://...",
    //     credentialUrl: "https://..."
    //   }
    // ]
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar certificações:", error);
    throw error;
  }
};

// POST - Criar nova certificação
export const createCertificationExample = async () => {
  const certificationData = {
    title: "React Developer Certification",
    issuer: "Meta",
    date: "2024-11-03",
    description: "Certificação avançada em React e React Native",
    imageUrl: "https://example.com/cert-image.jpg",
    credentialUrl: "https://credentials.example.com/verify/123456",
  };

  try {
    const response = await api.post("/certifications", certificationData);
    console.log("Certificação criada:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao criar certificação:", error);
    throw error;
  }
};

// PUT - Atualizar certificação existente
export const updateCertificationExample = async (certId: string) => {
  const updatedData = {
    title: "React Developer Certification - Advanced",
    issuer: "Meta",
    date: "2024-11-03",
    description: "Certificação atualizada com novos módulos",
    imageUrl: "https://example.com/new-cert-image.jpg",
    credentialUrl: "https://credentials.example.com/verify/789012",
  };

  try {
    const response = await api.put(`/certifications/${certId}`, updatedData);
    console.log("Certificação atualizada:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar certificação:", error);
    throw error;
  }
};

// DELETE - Deletar certificação
export const deleteCertificationExample = async (certId: string) => {
  try {
    const response = await api.delete(`/certifications/${certId}`);
    console.log("Certificação deletada:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar certificação:", error);
    throw error;
  }
};

// =====================================
// 🔐 AUTENTICAÇÃO
// =====================================

// POST - Login
export const loginExample = async () => {
  const credentials = {
    email: "admin@example.com",
    password: "senha123",
  };

  try {
    const response = await api.post("/auth/login", credentials);
    console.log("Login bem-sucedido:", response.data);
    
    // Resposta esperada: { token: "jwt-token-aqui" }
    
    // Salvar token no localStorage
    localStorage.setItem("token", response.data.token);
    
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

// POST - Logout
export const logoutExample = () => {
  // Remover token do localStorage
  localStorage.removeItem("token");
  console.log("Logout realizado");
};

// =====================================
// 📊 EXEMPLOS DE TRATAMENTO DE ERROS
// =====================================

export const handleApiErrorExample = async () => {
  try {
    // Alguma requisição
    await api.get("/projects");
  } catch (err: any) {
    // Erro de resposta da API
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Mensagem:", err.response.data.message);
      
      // Tratar erros específicos
      switch (err.response.status) {
        case 400:
          console.error("Dados inválidos");
          break;
        case 401:
          console.error("Não autorizado - fazer login novamente");
          localStorage.removeItem("token");
          break;
        case 404:
          console.error("Recurso não encontrado");
          break;
        case 500:
          console.error("Erro no servidor");
          break;
        default:
          console.error("Erro desconhecido");
      }
    }
    // Erro de rede
    else if (err.request) {
      console.error("Erro de conexão - verifique sua internet");
    }
    // Outro tipo de erro
    else {
      console.error("Erro:", err.message);
    }
  }
};

// =====================================
// 🔧 CONFIGURAÇÃO DE INTERCEPTORS
// =====================================

// Adicionar token automaticamente às requisições
export const setupAuthInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Tratar respostas de erro globalmente
export const setupResponseInterceptor = () => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem("token");
        window.location.href = "/auth";
      }
      return Promise.reject(error);
    }
  );
};

// =====================================
// 💡 DICAS DE USO
// =====================================

/*
1. Sempre use try-catch para requisições assíncronas
2. Mostre feedback visual ao usuário (loading, success, error)
3. Valide dados antes de enviar à API
4. Use TypeScript para tipar as respostas
5. Implemente debounce para buscas em tempo real
6. Cache dados quando apropriado
7. Trate erros de forma consistente
8. Use estados de loading para melhor UX
9. Implemente retry logic para requisições falhas
10. Adicione timeout para requisições longas
*/

// =====================================
// 📝 TIPOS TYPESCRIPT
// =====================================

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  imageUrl?: string;
  credentialUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
