import { useEffect, useState } from "react";
import { updateUser } from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";

const UpdateUsers = ({ userLoad, onClose, loadUsers }) => {
  const [email, setEmail] = useState(userLoad?.email);
  const [login, setLogin] = useState(userLoad?.login);
  const [phone, setPhone] = useState(userLoad?.telefone);
  const [cargo, setCargo] = useState(userLoad?.cargo);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = () => toast("Atualização feita com sucesso!");

  //  Função para envio de formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      login: login,
      email: email,
      telefone: phone,
      cargo: cargo,
    };

    try {
      setLoading(true);
      await updateUser(userLoad?.id, user);
      loadUsers()
      onClose();
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

  // Trazer os dados do formulário preenchidos automaticamente
  useEffect(() => {
    setEmail(userLoad?.email);
    setLogin(userLoad?.login);
    setPhone(userLoad?.telefone);
    setCargo(userLoad?.cargo);
  }, [userLoad]);

  return (
    <div className="flex flex-col items-center w-auto bg-white">
      <div className="bg-[#fafafa] rounded shadow-md p-8 w-full max-w-xl border border-gray-200 relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{`Dados do usuário ${userLoad?.login}`}</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Preencha os dados abaixo para atualizar.
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {/* Formulario para atualizar o usuário */}
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
              Cargo
            </label>
            <select
              className="w-full border border-gray-200 bg-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            >
              <option value="">Selecione o cargo</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuário</option>
              <option value="AGENT">Agente</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            onClick={() => notify()}
            className={`w-full font-bold py-2 rounded-md mt-2 transition ${
              loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {loading ? "Atualizando..." : "Atualizar Usuário"}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={600} />
    </div>
  );
};

export default UpdateUsers;
