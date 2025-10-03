import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { BsActivity } from "react-icons/bs";
import { GiPlantsAndAnimals } from "react-icons/gi";
import api from "../../../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !cpf || !phone || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return false;
    }
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://iftm-izoo-pie4-backend.onrender.com';
      console.log("Tentando fazer cadastro com API URL:", API_URL);
      console.log("VITE_API_URL from env:", import.meta.env.VITE_API_URL);
      
      await api.post("/usuario/cadastro", {
        nome: name,
        email: email,
        cpf: cpf,
        telefone: phone,
        login: email, // usando email como login
        senha: password
      });

      // Redirecionar para login após registro bem-sucedido
      navigate("/login", { 
        state: { message: "Cadastro realizado com sucesso! Faça seu login." } 
      });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setError("Dados inválidos. Verifique as informações fornecidas.");
      } else if (error.response?.status === 409) {
        setError("Email ou CPF já cadastrado.");
      } else {
        setError("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="flex gap-3 items-center mb-6  mt-8">
        <GiPlantsAndAnimals size={40} className="text-green-700" />
        <h1 className="text-2xl font-semibold mt-2 text-gray-800">Izoo</h1>
      </div>
      <div className="bg-[#fafafa] rounded-xl shadow-md p-8 w-full max-w-xl border border-gray-200">
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
              Nome
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
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
              CPF
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-800">
              Telefone
            </label>
            <input
              type="tel"
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              placeholder="(99) 99999-9999"
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
    </div>
  );
};

export default Register;
