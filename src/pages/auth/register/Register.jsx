import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { useAuth } from "../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  const notify = () => toast("Conta criada com sucesso! ");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const registerData = {
      login: login,
      senha: password,
      email: email,
      telefone: "+55" + phone,
    };

    try {
      setLoading(true);
      await register(registerData);
      navigate("/login", {
        // Enviar os estados ja preeenchidos, para login.
        state: {
          loginField: registerData.login,
          password: registerData.senha
        }
      });
    } catch (error) {
      console.log("Erro detalhado no registro:", error.response?.data || error);
      setError(
        error.response?.data?.error ||
          "Erro ao registrar. Verifique os dados e tente novamente."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex gap-3 items-center mb-6  mt-8">
        <GiPlantsAndAnimals size={40} className="text-green-700" />
        <h1 className="text-2xl font-semibold mt-2 text-gray-800">Izoo</h1>
      </div>
      <div className="bg-[#fafafa] rounded shadow-md p-8 w-full max-w-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Criar Conta</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Preencha os dados abaixo para criar sua conta no sistema
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Login
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Digite seu usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              E-mail
            </label>
            <input
              type="email"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Telefone
            </label>
            <input
              type="tel"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="(99) 999999999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            onClick={notify}
            className={`w-full font-bold py-2 rounded-md mt-2 transition ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {loading ? "Criando Conta..." : "Criar Conta"}
          </button>
        </form>
      </div>
      <div className="mt-4 text-gray-600">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="text-green-700 font-semibold hover:underline"
        >
          Faça login
        </Link>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
