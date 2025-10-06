import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

  // Configurar a instância api para incluir o token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }, []);

  // Verificar se o usuário está autenticado ao carregar a aplicação
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          setToken(storedToken);
          api.defaults.headers.common[
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

  const register = async (registerData) => {
    try {
      const response = await api.post("/usuario/registro", registerData);
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Erro no registro:", error);
      throw error;
    }
  };

  const users = async () => {
    try {
      const response = await api.get("/usuario");
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Erro ao buscar usuários:", error);
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
    register,
    users,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
