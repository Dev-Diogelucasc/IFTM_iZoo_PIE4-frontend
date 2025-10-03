import { useState } from "react";
import { Link } from "react-router-dom";
import { BsActivity } from "react-icons/bs";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const endpoint = "/usuario/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(endpoint, {
        login: login,
        senha: password,
      });
      const token = response.data.token;

      setLogin("");
      setPassword("");

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="flex gap-3 items-center mb-6">
        <BsActivity size={40} className="text-green-700" />
        <h1 className="text-2xl font-semibold mt-2 text-gray-800">Izoo</h1>
      </div>
      <div className="bg-[#fafafa] border border-gray-200 shadow rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Login</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Entre com suas credenciais para acessar o sistema
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
              Email:
            </label>
            <input
              id="login"
              type="text"
              placeholder="Digite seu login"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
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
            className="bg-green-700 text-white rounded px-4 py-2 font-semibold hover:bg-green-800 transition w-full mt-2"
          >
            Entrar
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
