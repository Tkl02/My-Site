import axios from "axios";

const verceUrl = 'http://localhost:9595'

export const api = axios.create({
    baseURL: `${verceUrl}/api`,
    withCredentials: true
})

// ✅ INTERCEPTOR DE REQUISIÇÃO: Adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ INTERCEPTOR DE RESPOSTA: Tratar erros 401 (não autorizado)
api.interceptors.response.use(
  (response) => {
    // Resposta bem-sucedida, retornar normalmente
    return response;
  },
  (error) => {
    // Se o erro for 401 (não autorizado)
    if (error.response?.status === 401) {
      console.error("❌ Token inválido ou expirado (401)");
      console.error("❌ URL:", error.config?.url);
      console.error("❌ Método:", error.config?.method);
      console.error("❌ Resposta:", error.response?.data);
      
      // ✅ MELHORIA: Não redirecionar imediatamente em rotas específicas
      // Permitir que o componente trate o erro primeiro
      const isUpdateRoute = error.config?.url?.includes('/projects/') && error.config?.method === 'put';
      const isCreateRoute = error.config?.method === 'post';
      
      if (!isUpdateRoute && !isCreateRoute) {
        // Limpar token e redirecionar apenas em GETs e casos gerais
        localStorage.removeItem("auth_token");
        window.location.href = "/logarusuario";
      } else {
        // Em updates/creates, apenas logar e deixar componente tratar
        console.warn("⚠️ Erro 401 em operação de escrita, componente vai tratar");
      }
    }
    
    return Promise.reject(error);
  }
);

