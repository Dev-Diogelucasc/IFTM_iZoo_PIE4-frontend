import { useState } from "react";
//import { BsActivity } from "react-icons/bs";
import { GiPlantsAndAnimals } from "react-icons/gi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
            className="w-full bg-green-700 text-white font-bold py-2 rounded-md mt-2 hover:bg-green-800 transition"
          >
            Criar Conta
          </button>
        </form>
      </div>
      <div className="mt-4 text-gray-600">
        Já tem uma conta?{" "}
        <a
          href="/login"
          className="text-green-700 font-semibold hover:underline"
        >
          Faça login
        </a>
      </div>
    </div>
  );
};

export default Register;
