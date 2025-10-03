import axios from "axios";

// Configuração segura da API
const API_CONFIG = {
  // URL base da API (usar variável de ambiente ou fallback)
  baseURL:
    import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: false, // Para CORS
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Debug seguro (sem expor URLs completas em produção)
const isProduction = import.meta.env.PROD;
if (!isProduction) {
  console.log("API Configuration:", {
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    environment: import.meta.env.MODE,
  });
}

// Instância do axios configurada
const api = axios.create(API_CONFIG);

// Interceptador para requests
api.interceptors.request.use(
  (config) => {
    // Log apenas em desenvolvimento
    if (!isProduction) {
      console.log("🚀 Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data ? "Data present" : "No data",
      });
    }

    // Garantir headers CORS
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return config;
  },
  (error) => {
    if (!isProduction) {
      console.error("❌ Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Interceptador para responses
api.interceptors.response.use(
  (response) => {
    if (!isProduction) {
      console.log("✅ Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data ? "Data received" : "No data",
      });
    }
    return response;
  },
  (error) => {
    // Log de erro mais detalhado
    const errorInfo = {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      url: error.config?.url,
    };

    // Tratamento específico para CORS
    if (error.response?.status === 403) {
      errorInfo.corsError =
        "CORS Error - Backend não permite requisições deste domínio";
      console.error(
        "🚫 CORS Error: O backend precisa adicionar o domínio da Vercel nas configurações de CORS"
      );
    }

    if (error.message === "Network Error") {
      errorInfo.networkError =
        "Erro de rede - possível problema de CORS ou conectividade";
    }

    if (!isProduction) {
      console.error("❌ Response Error:", errorInfo);
    } else {
      // Em produção, log apenas informações essenciais
      console.error("API Error:", {
        status: errorInfo.status,
        message: errorInfo.message,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
