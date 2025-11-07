import axios from "axios";

const apiUrl = import.meta.env.VITE_VERCEL_URL;

export const api = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true
})

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      
      const isUpdateRoute = error.config?.url?.includes('/projects/') && error.config?.method === 'put';
      const isCreateRoute = error.config?.method === 'post';
      
      if (!isUpdateRoute && !isCreateRoute) {
        localStorage.removeItem("auth_token");
        window.location.href = "/logarusuario";
      } else {
        console.warn("⚠️ Erro 401 em operação de escrita, componente vai tratar");
      }
    }
    return Promise.reject(error);
  }
);

