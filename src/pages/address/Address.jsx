import { useEffect, useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";
import { LuHousePlus } from "react-icons/lu";
import RegisterAddress from "./registerAddress/RegisterAddress";
import { LuMapPinHouse } from "react-icons/lu";
import { IoQrCodeOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UpdateAddress from "./updateAddress/UpdateAddress";
import { getAllEnderecos, deleteAddress } from "../../services/api";

const Address = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const notify = () => toast("Endereço excluido com sucesso!");
  const notifyQrCode = () => toast("Qr Code gerado com sucesso!");

  // Função de Get da api
  const loadAddress = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllEnderecos();
      console.log("Response from API:", response);

      if (response && response.success && response.data) {
        console.log("Address data:", response.data);
        setAddress(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setAddress(response);
      }
    } catch (error) {
      console.error("Erro completo", error);
      setAddress([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  // Função para deletar endereço
  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      loadAddress();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  // Função para Gerar qr Code
  const handleGenerateQR = (obj) => {
    const url = `${obj.id}`;
    setQrValue(url);
    setQrOpen(true);
  };

  // Bloqueia acesso se não for ADMIN
  if (user?.cargo !== "ADMIN") {
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
      <main className=" relative flex-1 min-w-0 flex flex-col ml-2 items-center px-3 md:px-8 mt-6">
        <div className=" w-full mb-6 mr-15 md:mr-0 flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Gerenciar Endereços
            </h2>
            <span className="text-sm text-gray-500 font-light">
              Cadastre e gerencie os endereços para inspeções
            </span>
          </div>
          <button
            type="button"
            className="flex items-center justify-center sm:gap-2 bg-green-50 border border-stone-300 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer font-medium mb-2"
            aria-label="Adicionar Residência"
            onClick={() => setOpen(true)}
          >
            <LuHousePlus className="text-lg" />
            <span className="text-sm">Adicionar Endereço</span>
          </button>
        </div>

        {loading && (
          <div className="w-full text-center py-8 text-gray-500">
            Carregando endereços...
          </div>
        )}

        {error && (
          <div className="w-full text-center py-4 text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full mr-15 md:mr-0">
          {address.map((obj) => (
            <div
              key={obj.id}
              className="bg-[#F8F8F8] rounded-lg shadow-md border border-gray-200 p-6 relative"
            >
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold bg-green-600">
                Residencial
              </span>
              <div className="flex items-start gap-3 mb-2">
                <LuMapPinHouse size={20} className="text-green-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {`${obj.rua}, ${obj.numero}`}
                  </h3>
                  <p className="text-sm text-gray-500">{`${obj.bairro}, ${obj.cidade}/${obj.estado}`}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">CEP:</span>
                  <span className="text-gray-900">{obj.cep}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Coordenadas:</span>
                  <span className="text-gray-900">{`${obj.latitude} / ${obj.longitude}`}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 border border-stone-200 rounded-md px-3 py-2 hover:bg-green-100 transition text-sm cursor-pointer"
                  onClick={() => {
                    handleGenerateQR(obj);
                    notifyQrCode();
                  }}
                >
                  <IoQrCodeOutline />
                  QR Code
                </button>

                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-md hover:bg-stone-100 cursor-pointer"
                  title="Editar"
                  onClick={() => {
                    setUpdateAddress(obj);
                    setOpenUpdate(true);
                  }}
                >
                  <BiEdit />
                </button>

                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-md hover:bg-red-100 text-red-600 cursor-pointer"
                  title="Excluir"
                  onClick={() => {
                    handleDelete(obj.id);
                    notify();
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para registar nova residência */}
        {open && (
          <RegisterAddress
            onClose={() => setTimeout(() => setOpen(false), 600)}
            loadAddress={loadAddress}
          />
        )}

        {/* Modal para Atualizar Residência */}
        {openUpdate && (
          <UpdateAddress
            address={updateAddress}
            onClose={() => setTimeout(() => setOpenUpdate(false), 600)}
            loadAddress={loadAddress}
          />
        )}

        {/* Modal do Qr code */}
        {qrOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold">QR Code Gerado!</p>
                </div>
                <button
                  onClick={() => setQrOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-2xl cursor-pointer"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-white p-2 rounded">
                  {/* Componente que rendezira o Qr code */}
                  <QRCode value={qrValue} size={200} className="qr-svg" />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Escaneie este QR Code ao registrar uma inspeção neste endereço
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(qrValue);
                  }}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:text-white hover:bg-green-600"
                >
                  Copiar link
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer position="bottom-right" autoClose={600} />
      </main>
    </div>
  );
};

export default Address;
