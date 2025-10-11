import { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { IoCameraOutline } from "react-icons/io5";
import { LuHousePlus } from "react-icons/lu";
import ScannerQr from "../../components/scannerQr/ScannerQr";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getEnderecoParaInspecao } from "../../services/api";

const RecordInspection = () => {
    const [openQr, setOpenQr] = useState(false);
    const [enderecoData, setEnderecoData] = useState(null);
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

            // Chama a API para buscar os dados do endereço
            const data = await getEnderecoParaInspecao(enderecoId);

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
                            Escaneie o QR-Code para consultar as últimas inspeções
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
                            Escaneie o QR Code do local para consultar todas as visitas
                        </span>
                    </div>

                    {/* Exibir dados do endereço após scanear */}
                    {enderecoData && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                            <h3 className="font-medium text-base text-gray-900 mb-2">
                                Dados do Endereço Escaneado:
                            </h3>
                            <div className="text-sm text-gray-700">
                                <pre className="whitespace-pre-wrap">
                                    {JSON.stringify(enderecoData, null, 2)}
                                </pre>
                            </div>
                        </div>
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
