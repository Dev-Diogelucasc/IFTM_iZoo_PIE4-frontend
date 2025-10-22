import { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { IoCameraOutline } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAddressforInspection, createInspecao } from "../../services/api";
import ScannerQr from "../../components/scannerQr/ScannerQr";
import { ToastContainer, toast } from "react-toastify";

const CreateInspection = () => {
  const [openQr, setOpenQr] = useState(false);
  const [enderecoData, setEnderecoData] = useState(null);
  const [enderecoId, setEnderecoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const notify = () => toast("Inspeção registrada com sucesso!");

  // Estado do formulário
  const [formData, setFormData] = useState({
    tipo: "",
    gravidade: "",
    status: "",
  });

  const handleQrCodeScan = async (scannedData) => {
    try {
      setLoading(true);
      setError(null);

      // O QR code deve conter o ID do endereço
      const scannedEnderecoId = scannedData;
      setEnderecoId(scannedEnderecoId);

      // Chama a API para buscar os dados do endereço
      const data = await getAddressforInspection(scannedEnderecoId);

      setEnderecoData(data);
      setOpenQr(false);

      console.log("Dados do endereço:", data);
    } catch (err) {
      console.error("Erro ao buscar endereço:", err);
      setError("Erro ao buscar dados do endereço. Verifique o QR Code.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações
    if (!enderecoId) {
      setError("Por favor, escaneie o QR Code do endereço primeiro.");
      return;
    }

    if (!formData.tipo || !formData.gravidade || !formData.status) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const inspecaoData = {
        tipo: formData.tipo,
        enderecoId: enderecoId,
        gravidade: formData.gravidade,
        status: formData.status,
        criadoPor: user.login, // Login do usuário autenticado
      };

      console.log("Enviando inspeção:", inspecaoData);

      const response = await createInspecao(inspecaoData);

      console.log("Inspeção criada com sucesso:", response);
      setSuccess(true);

      // Limpar formulário após sucesso
      setFormData({
        tipo: "",
        gravidade: "",
        status: "",
      });
      setEnderecoData(null);
      setEnderecoId("");

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate("/inspecoes/consultar");
      }, 2000);
    } catch (err) {
      console.error("Erro ao criar inspeção:", err);
      setError(
        err.response?.data?.message ||
          "Erro ao criar inspeção. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      tipo: "",
      gravidade: "",
      status: "",
    });
    setEnderecoData(null);
    setEnderecoId("");
    setError(null);
    setSuccess(false);
  };

  if (user?.cargo === "USER") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso negado</h2>
        <p className="text-gray-700">
          Você não tem permissão para acessar esta página.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={() => navigate("/")}
        >
          Voltar para o início
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <main className="relative flex-1 min-w-0 flex flex-col ml-2 items-center px-3 md:px-8 mt-6">
        <div className="w-full mb-6 mr-15 md:mr-0 flex justify-between">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Registrar Nova Inspeção
            </h2>
            <span className="text-sm text-gray-500 font-light">
              Escaneie o QR-Code do endereço e preencha os dados da inspeção
            </span>
          </div>
        </div>

        <div className="bg-[#F8F8F8] w-full border border-gray-200 rounded shadow p-5 mr-15 md:mr-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-8">
              <span className="font-medium text-base text-gray-900">
                Dados da inspeção
              </span>
              <span className="text-sm text-gray-500 font-light">
                Informe todos os detalhes da inspeção realizada
              </span>
            </div>

            {/* Seção de QR Code */}
            <div className="flex flex-col mb-6">
              <span className="font-medium text-sm text-gray-900 mb-1">
                Escanear QR-Code do endereço *
              </span>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full bg-green-50 border border-stone-300 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer font-medium mb-2"
                  aria-label="Escanear QR Code"
                  onClick={() => setOpenQr(true)}
                >
                  <IoCameraOutline className="text-lg" />
                  <span className="text-sm">Escanear QR Code</span>
                </button>
              </div>
              <span className="text-sm text-gray-500 font-light">
                Escaneie o QR Code do local para vincular o endereço à inspeção
              </span>
            </div>

            {/* Exibir dados do endereço após scanear */}
            {enderecoData && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-base text-gray-900 mb-2">
                  ✓ Endereço Escaneado:
                </h3>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>ID:</strong> {enderecoId}
                  </p>
                  {enderecoData.rua && (
                    <p>
                      <strong>Rua:</strong> {enderecoData.rua}
                    </p>
                  )}
                  {enderecoData.numero && (
                    <p>
                      <strong>Número:</strong> {enderecoData.numero}
                    </p>
                  )}
                  {enderecoData.bairro && (
                    <p>
                      <strong>Bairro:</strong> {enderecoData.bairro}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Campo Tipo */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="tipo"
                className="font-medium text-sm text-gray-900 mb-1"
              >
                Tipo de Inspeção *
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Animal peçonhento">Animal peçonhento</option>
                <option value="Foco de mosquito">Foco de mosquito</option>
                <option value="Água parada">Água parada</option>
                <option value="Lixo acumulado">Lixo acumulado</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            {/* Campo Gravidade */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="gravidade"
                className="font-medium text-sm text-gray-900 mb-1"
              >
                Gravidade *
              </label>
              <select
                id="gravidade"
                name="gravidade"
                value={formData.gravidade}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Selecione a gravidade</option>
                <option value="leve">Leve</option>
                <option value="moderado">Moderado</option>
                <option value="grave">Grave</option>
                <option value="gravíssimo">Gravíssimo</option>
              </select>
            </div>

            {/* Campo Status */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="status"
                className="font-medium text-sm text-gray-900 mb-1"
              >
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Selecione o status</option>
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluído">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {/* Mensagens de erro e sucesso */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">
                  ✓ Inspeção criada com sucesso! Redirecionando...
                </p>
              </div>
            )}

            {/* Botões de ação */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
                onClick={() => notify()}
              >
                {loading ? "Salvando..." : "Salvar Inspeção"}
              </button>
            </div>
          </form>
        </div>

        {/* Modal do Scanner QR */}
        {openQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-transparent p-6 mx-4">
              <ScannerQr
                onClose={() => setOpenQr(false)}
                onScan={handleQrCodeScan}
              />
            </div>
          </div>
        )}
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={800}
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

export default CreateInspection;
