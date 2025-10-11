import axios from "axios";

const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
    withCredentials: false, // Para CORS
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

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
        if (!isProduction) {
            console.log("🚀 Request:", {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data ? "Data present" : "No data",
            });
        }

        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        return config;
    },
    (error) => {
        if (!isProduction) {
            console.error("Request Error:", error.message);
        }
        return Promise.reject(error);
    }
);

// Interceptador para responses
api.interceptors.response.use(
    (response) => {
        if (!isProduction) {
            console.log("Response:", {
                status: response.status,
                url: response.config.url,
                data: response.data ? "Data received" : "No data",
            });
        }
        return response;
    },
    (error) => {
        const errorInfo = {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.message,
            url: error.config?.url,
        };

        if (error.message === "Network Error") {
            errorInfo.networkError =
                "Erro de rede - possível problema de CORS ou conectividade";
        }

        if (!isProduction) {
            console.error(" Response Error:", errorInfo);
        } else {
            console.error("API Error:", {
                status: errorInfo.status,
                message: errorInfo.message,
            });
        }

        return Promise.reject(error);
    }
);

// Função para buscar endereço por ID para inspeção
export const getEnderecoParaInspecao = async (enderecoId) => {
    try {
        const response = await api.get(`/inspecao/endereco/${enderecoId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar endereço para inspeção:", error);
        throw error;
    }
};

// Função para criar uma nova inspeção
export const createInspecao = async (inspecaoData) => {
    try {
        const response = await api.post("/inspecao", inspecaoData);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar inspeção:", error);
        throw error;
    }
};

export default api;
