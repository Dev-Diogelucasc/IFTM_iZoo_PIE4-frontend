import axios from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar logs de requisições
api.interceptors.request.use(
  (config) => {
    console.log('Fazendo requisição para:', config.url);
    console.log('Base URL:', config.baseURL);
    console.log('Dados:', config.data);
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptador para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Erro na resposta:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message
    });
    
    // Tratamento específico para erros de CORS
    if (error.message === 'Network Error') {
      console.error('Possível problema de CORS ou conectividade');
    }
    
    return Promise.reject(error);
  }
);

export default api;