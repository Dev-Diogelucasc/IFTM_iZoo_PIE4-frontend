import { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { IoCameraOutline } from "react-icons/io5";
import ScannerQr from "../../components/scannerQr/ScannerQr";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    getAddressforInspection,
    getEnderecoById,
    getUser,
} from "../../services/api";

const RecordInspection = () => {
    const [openQr, setOpenQr] = useState(false);
    const [enderecoData, setEnderecoData] = useState(null);
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleQrCodeScan = async (scannedData) => {
        try {
            setLoading(true);
            setError(null);

            // O QR code deve conter o ID do endereço
            const enderecoId = scannedData;

            // Buscar inspeções, endereço e usuários em paralelo
            const [data, addr, usuariosData] = await Promise.all([
                getAddressforInspection(enderecoId),
                getEnderecoById(enderecoId),
                getUser(),
            ]);

            // Criar um mapa de usuários para acesso rápido
            const usuariosMap = {};
            usuariosData.data.forEach((usuario) => {
                usuariosMap[usuario.id] = usuario.login;
            });

            // Adicionar o login do usuário que criou cada inspeção
            const inspecoesComUsuario = data.map((inspecao) => ({
                ...inspecao,
                criadoPorLogin:
                    usuariosMap[inspecao.criadoPor] || "Usuário não encontrado",
            }));

            setEnderecoData(inspecoesComUsuario);
            setAddress(addr ? [addr] : []);
            setOpenQr(false);

            console.log("Dados do endereço (inspeções):", inspecoesComUsuario);
        } catch (err) {
            console.error("Erro ao buscar endereço:", err);
            setError("Erro ao buscar dados do endereço. Verifique o QR Code.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (user?.cargo === "USER") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Acesso negado
                </h2>
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
                            Consultar endereço
                        </h2>
                        <span className="text-sm text-gray-500 font-light">
                            Escaneie o QR-Code para consultar as últimas
                            inspeções
                        </span>
                    </div>
                </div>
                <div className=" bg-[#F8F8F8] w-full border border-gray-200 rounded shadow p-5 mr-15 md:mr-0">
                    <div className="flex flex-col mb-8">
                        <span className="font-medium text-base text-gray-900">
                            Dados da inspeção
                        </span>
                        <span className="text-sm text-gray-500 font-light">
                            Preencher após inspeção no endereço
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-900 mb-1">
                            Escanear QR-Code do endereço
                        </span>
                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 w-full bg-green-50 border border-stone-300 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer font-medium mb-2"
                                aria-label="Escanear QR Code"
                                onClick={() => {
                                    setOpenQr(true);
                                }}
                            >
                                <IoCameraOutline className="text-lg" />
                                <span className="text-sm">
                                    Escanear QR Code
                                </span>
                            </button>
                        </div>
                        <span className="text-sm text-gray-500 font-light ">
                            Escaneie o QR Code do local para consultar todas as
                            visitas
                        </span>
                    </div>

                    {/* Exibir dados do endereço após scanear */}
                    {enderecoData && (
                        <>
                            <div className="mt-6 p-2 border-none bg-green-50 border border-green-200 rounded">
                                <h3 className=" text-base text-gray-900 mb-2">
                                    Dados do Endereço Escaneado:
                                </h3>
                                {/* Exibir informações do endereço */}
                                {address && address.length > 0 && (
                                    <div className="text-sm text-gray-700 mt-2">
                                        <p className="font-medium">
                                            {address[0]?.rua || "N/A"},{" "}
                                            {address[0]?.numero || "S/N"},{" "}
                                            {address[0]?.bairro || "N/A"} -{" "}
                                            {address[0]?.cidade || "N/A"},{" "}
                                            {address[0]?.estado || "N/A"} -{" "}
                                            {address[0]?.cep || "N/A"}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="overflow-x-auto rounded border border-stone-200 w-full font-light shadow">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="bg-white border-b border-stone-200">
                                            <th className="px-4 py-3 text-left">
                                                Data
                                            </th>
                                            <th className="px-4 py-3 text-left">
                                                Tipo
                                            </th>
                                            <th className="px-4 py-3 text-left">
                                                Criado por
                                            </th>
                                            <th className="px-4 py-3 text-left">
                                                Gravidade
                                            </th>
                                            <th className="px-4 py-3 text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {!loading &&
                                        enderecoData.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    Nenhuma Inspeção encontrada!
                                                </td>
                                            </tr>
                                        ) : (
                                            enderecoData.map((insp) => (
                                                <tr
                                                    key={
                                                        insp.id ||
                                                        insp.enderecoId
                                                    }
                                                    className="border-b border-stone-200 items-center"
                                                >
                                                    <td className="px-4 py-4">
                                                        {formatDate(
                                                            insp.createdAt
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {insp.tipo}
                                                    </td>

                                                    {/* Coluna Criado por */}
                                                    <td className="px-4 py-4 text-sm">
                                                        {insp.criadoPorLogin ||
                                                            "N/A"}
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        {(() => {
                                                            const cls =
                                                                insp.gravidade ===
                                                                "leve"
                                                                    ? "bg-green-100 text-green-800 ring-green-200"
                                                                    : insp.gravidade ===
                                                                      "moderado"
                                                                    ? "bg-yellow-100 text-yellow-800 ring-yellow-200"
                                                                    : insp.gravidade ===
                                                                      "grave"
                                                                    ? "bg-orange-100 text-orange-800 ring-orange-200"
                                                                    : insp.gravidade ===
                                                                      "gravissimo"
                                                                    ? "bg-red-100 text-red-800 ring-red-200"
                                                                    : "bg-gray-100 text-gray-700 ring-gray-200";

                                                            return (
                                                                <span
                                                                    className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ring-1 ring-inset ${cls}`}
                                                                >
                                                                    {insp.gravidade ||
                                                                        "—"}
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span
                                                            className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                                                                insp.status ===
                                                                "concluído"
                                                                    ? "bg-green-100 text-green-800 ring-green-200"
                                                                    : insp.status ===
                                                                      "em andamento"
                                                                    ? "bg-blue-100 text-blue-800 ring-blue-200"
                                                                    : insp.status ===
                                                                      "pendente"
                                                                    ? "bg-yellow-100 text-yellow-800 ring-yellow-200"
                                                                    : insp.status ===
                                                                      "cancelado"
                                                                    ? "bg-red-100 text-red-800 ring-red-200"
                                                                    : "bg-gray-100 text-gray-700 ring-gray-200"
                                                            }`}
                                                        >
                                                            {insp.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 flex gap-3"></td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* Exibir erro se houver */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Exibir loading */}
                    {loading && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-600">
                                Carregando dados do endereço...
                            </p>
                        </div>
                    )}
                </div>

                {/* Modal do Qr code */}
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
        </div>
    );
};

export default RecordInspection;
