import axios from "axios";

// Definir a URL da API com base no ambiente
const getApiUrl = () => {
  // Se estivermos em produção no Vercel
  if (window.location.hostname.includes("vercel.app")) {
    return "https://iftm-izoo-pie4-backend.onrender.com";
  }

  // Tentar usar a variável de ambiente primeiro
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl !== "undefined") {
    return envUrl;
  }

  // Fallback para a URL de produção
  return "https://iftm-izoo-pie4-backend.onrender.com";
};

const API_URL = getApiUrl();

// Debug logs
console.log("Environment check:");
console.log("- Hostname:", window.location.hostname);
console.log("- VITE_API_URL from env:", import.meta.env.VITE_API_URL);
console.log("- Final API_URL:", API_URL);

// Configuração base do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar logs de requisições
api.interceptors.request.use(
  (config) => {
    console.log("=== REQUEST DEBUG ===");
    console.log("Full URL:", config.baseURL + config.url);
    console.log("Base URL:", config.baseURL);
    console.log("Endpoint:", config.url);
    console.log("Method:", config.method);
    console.log("Data:", config.data);
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptador para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    console.log("=== RESPONSE DEBUG ===");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("=== ERROR DEBUG ===");
    console.error("Status:", error.response?.status);
    console.error("StatusText:", error.response?.statusText);
    console.error("Data:", error.response?.data);
    console.error("URL:", error.config?.url);
    console.error("Full URL:", error.config?.baseURL + error.config?.url);
    console.error("Message:", error.message);

    // Tratamento específico para erros de CORS
    if (error.message === "Network Error") {
      console.error("Possível problema de CORS ou conectividade");
    }

    return Promise.reject(error);
  }
);

export default api;
