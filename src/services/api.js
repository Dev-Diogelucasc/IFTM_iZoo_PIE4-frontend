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

// Função para Registar Usuário
export const registerUser = async (registerData) => {
  try {
    const response = await api.post("/usuario/registro", registerData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro no registro:", error);
    throw error;
  }
};

// Função para pegar todos usuários
export const getUser = async () => {
  try {
    const response = await api.get("/usuario");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

// Função para Atualizar Usuário
export const updateUser = async (id, data) => {
  try {
    const response = await api.patch(`/usuario/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("erro ao atualizar Usuário", error);
    throw error;
  }
};

// Função para Deletar Usuário
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/usuario/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao deletar o usuário", error);
    throw error;
  }
};

// Função para buscar endereço por ID para inspeção
export const getAddressforInspection = async (enderecoId) => {
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

// Função para listar todas as inspeções
export const getAllInspecoes = async () => {
  try {
    const response = await api.get("/inspecao");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar inspeções:", error);
    throw error;
  }
};

// Função para atualizar inspeção
export const fetchInspections = async (inspetionId, data) => {
  try {
    const response = await api.patch(`/inspecao/${inspetionId}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar inspeção", error);
  }
};

// Função para buscar endereço por ID
export const getEnderecoById = async (enderecoId) => {
  try {
    const response = await api.get(`/endereco/${enderecoId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    throw error;
  }
};

// Função para listar todos os endereços
export const getAllEnderecos = async () => {
  try {
    const response = await api.get("/endereco");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    throw error;
  }
};

// Função para Registrar Endereço
export const registerAddress = async (residenceData) => {
  try {
    const response = await api.post("/endereco", residenceData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao registrar residência", error);
    throw error;
  }
};

// Função para Atualizar Endereço
export const updateAddress = async (id, data) => {
  try {
    const response = await api.put(`/endereco/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    throw error;
  }
};

// Função para Deletar Endereço
export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/endereco/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao Deletar endereço:", error);
    throw error;
  }
};

// // Função para Validar o token de Recuperação de senha
// export const verifyToken = async (data) => {
//   try {
//     const response = await api.post("/recuperacao-senha/validar-token", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error("Erro ao verificar token:", error);
//     throw error;
//   }
// };

// Função Solicitar recuperação de senha
export const requestPassword = async (data) => {
  try {
    const response = await api.post("/recuperacao-senha/solicitar", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao solicitar nova Senha:", error);
    throw error;
  }
};

// Função para redefinir senha
export const resetPassword = async (data) => {
  try {
    const response = await api.post("/recuperacao-senha/redefinir", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    throw error;
  }
};

// ==================== RELATÓRIOS ====================

// Buscar inspeções por tipo
export const getInspecoesPorTipo = async (tipo) => {
  try {
    const response = await api.get(`/inspecao/tipo/${tipo}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por tipo:", error);
    throw error;
  }
};

// Buscar inspeções por status
export const getInspecoesPorStatus = async (status) => {
  try {
    const response = await api.get(`/inspecao/status/${status}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por status:", error);
    throw error;
  }
};

// Buscar minhas inspeções
export const getMinhasInspecoes = async () => {
  try {
    const response = await api.get("/inspecao/minhas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar minhas inspeções:", error);
    throw error;
  }
};

// Buscar inspeções por gravidade
export const getInspecoesPorGravidade = async (gravidade) => {
  try {
    const response = await api.get(`/inspecao/gravidade/${gravidade}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por gravidade:", error);
    throw error;
  }
};

// Buscar inspeções por filtro (endereço ID e status)
export const getInspecoesPorFiltro = async (params) => {
  try {
    const response = await api.get("/inspecao/filtro", { params });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por filtro:", error);
    throw error;
  }
};

// Buscar inspeções por endereço ID
export const getInspecoesPorEndereco = async (enderecoId) => {
  try {
    const response = await api.get(`/inspecao/endereco/${enderecoId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por endereço:", error);
    throw error;
  }
};

// Listar inspeções deletadas
export const getInspecoesDeletadas = async () => {
  try {
    const response = await api.get("/inspecao/deletadas");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções deletadas:", error);
    throw error;
  }
};

// Buscar inspeções por criador
export const getInspecoesPorCriador = async (criadoPor) => {
  try {
    const response = await api.get(`/inspecao/criador/${criadoPor}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por criador:", error);
    throw error;
  }
};

// Buscar inspeções por criador e status
export const getInspecoesPorCriadorEStatus = async (criadoPor, status) => {
  try {
    const response = await api.get(
      `/inspecao/criador/${criadoPor}/status/${status}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao buscar inspeções por criador e status:", error);
    throw error;
  }
};

export default api;
