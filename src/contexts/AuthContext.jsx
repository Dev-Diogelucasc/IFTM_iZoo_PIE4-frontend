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
          // seta token e header para chamadas subsequentes
          setToken(storedToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          // tenta decodificar o payload do JWT para recuperar dados do usuário
          try {
            const payload = JSON.parse(atob(storedToken.split(".")[1]));
            // payload pode ter diferentes formatos dependendo do backend
            const possibleUser =
              payload.usuario || payload.user || payload.usuarioLogado || null;
            if (possibleUser) {
              setUser(possibleUser);
            } else {
              // se não houver objeto 'usuario' no payload, tente campos diretos
              const login =
                payload.login || payload.sub || payload.email || null;
              const cargo =
                payload.cargo || payload.role || payload.roleName || null;
              if (login) setUser({ login, cargo });
            }
          } catch (e) {
            // token não contém payload JSON utilizável — opcional: buscar profile na API
            // Exemplo (se seu backend expor /usuario/me):
            // const resp = await api.get('/usuario/me');
            // setUser(resp.data.usuario);
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
