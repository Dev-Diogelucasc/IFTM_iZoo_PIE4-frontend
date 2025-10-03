import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsActivity } from "react-icons/bs";
import { useAuth } from "../../../contexts/AuthContext";

const Login = () => {
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginField || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(loginField, password);

      // Redirecionar para a tela inicial após login bem-sucedido
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError("Credenciais inválidas. Verifique seu login e senha.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="flex gap-3 items-center mb-4">
        <BsActivity size={40} className="text-green-700" />
        <h1 className="text-2xl font-semibold mt-2 text-gray-800">Izoo</h1>
      </div>
      <div className="bg-[#fafafa] border border-gray-200 shadow rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Login</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Entre com suas credenciais para acessar o sistema
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="login">
              Login:
            </label>
            <input
              id="login"
              type="text"
              placeholder="Digite seu login"
              onChange={(e) => setLoginField(e.target.value)}
              value={loginField}
              autoComplete="off"
              className="w-full border border-gray-200 bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm mb-1"
              htmlFor="password"
            >
              Senha:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
              className="w-full border border-gray-200 bg-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/esqueceu-senha"
              className="text-green-700 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`rounded px-4 py-2 font-semibold transition w-full mt-2 ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
      <div className="mt-6 text-center text-gray-600 text-sm">
        Não tem uma conta?{" "}
        <Link
          to="/cadastro"
          className="text-green-700 hover:underline font-medium"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
