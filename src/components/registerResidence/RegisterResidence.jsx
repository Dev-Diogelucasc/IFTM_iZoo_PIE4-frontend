import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const RegisterResidence = ({ onClose }) => {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { registerAddress } = useAuth();

  const notify = () => toast("Endereço Criado!");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // evita submissão duplicada por cliques rápidos
    if (loading) return;

    const register = {
      rua: street,
      numero: number,
      bairro: neighborhood,
      cep: cep,
      cidade: city,
      estado: estado,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      setLoading(true);
      await registerAddress(register);
      // Fecha o modal ao concluir para evitar manter o formulário aberto
      if (typeof onClose === "function") onClose();
      navigate("/endereco");
    } catch (error) {
      console.log("Erro detalhado no registro:", error.response?.data || error);
      setError(
        error.response?.data?.error ||
          "Erro ao registrar. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 border border-gray-200">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">
          Adicionar Residência
        </h2>
        <p className="text-gray-500 mb-6 text-sm text-center">
          Preencha os dados abaixo para cadastrar uma nova residência.
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-2/3">
              <label className="block font-medium mb-1 text-gray-700">
                Rua
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Digite o nome da rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block font-medium mb-1 text-gray-700">
                Número
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Nº"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-700">
                Bairro
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Digite o bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-700">
                CEP
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Digite o CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2/3">
              <label className="block font-medium mb-1 text-gray-700">
                Cidade
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Digite a cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="w-1/3">
              <label className="block font-medium mb-1 text-gray-700">
                Estado
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="UF"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
                maxLength={2}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-600 transition cursor-pointer"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1 text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 rounded-md mt-2 transition ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
            onClick={notify}
          >
            {loading ? "Salvando..." : "Salvar Residência"}
          </button>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
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
    </div>
  );
};

export default RegisterResidence;
