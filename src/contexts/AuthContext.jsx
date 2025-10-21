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
    let logoutTimer;
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          setToken(storedToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
          try {
            const payload = JSON.parse(atob(storedToken.split(".")[1]));
            const possibleUser =
              payload.usuario || payload.user || payload.usuarioLogado || null;
            if (possibleUser) {
              setUser(possibleUser);
            } else {
              const login =
                payload.login || payload.sub || payload.email || null;
              const cargo =
                payload.cargo || payload.role || payload.roleName || null;
              if (login) setUser({ login, cargo });
            }
            // logout automático pelo exp do token
            if (payload.exp) {
              const expMs = payload.exp * 1000;
              const nowMs = Date.now();
              const timeoutMs = expMs - nowMs;
              if (timeoutMs > 0) {
                logoutTimer = setTimeout(() => {
                  logout();
                }, timeoutMs);
              } else {
                logout();
              }
            }
            // --- FIM NOVO ---
          } catch (e) {
            console.warn("Não foi possível decodificar payload do token:", e);
          }
        } catch (error) {
          console.error("Token inválido:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Limpa o timer ao desmontar ou trocar token
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [logout, token]);

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
