import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Configurar axios para incluir o token em todas as requisições
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }, []);

  // Verificar se o usuário está autenticado ao carregar a aplicação
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // Aqui você pode fazer uma requisição para validar o token
          // Por enquanto, vamos apenas definir o token
          setToken(storedToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        } catch (error) {
          console.error("Token inválido:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [logout]);

  const login = async (loginData, senha) => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL;
      console.log("Tentando fazer login com API URL:", API_URL);
      console.log("VITE_API_URL from env:", import.meta.env.VITE_API_URL);

      const response = await api.post("/usuario/login", {
        login: loginData,
        senha: senha,
      });

      const { token: receivedToken, usuario } = response.data;

      setToken(receivedToken);
      setUser({ login: loginData, ...usuario });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
