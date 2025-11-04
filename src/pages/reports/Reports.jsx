import React, { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  getInspecoesPorStatus,
  getMinhasInspecoes,
  getInspecoesPorGravidade,
  getInspecoesDeletadas,
} from "../../services/api";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [relatorioData, setRelatorioData] = useState(null);

  // Função para gerar relatório baseado no tipo selecionado
  const handleGerarRelatorio = async () => {
    if (!tipoRelatorio) {
      setError("Por favor, selecione um tipo de relatório");
      return;
    }

    setLoading(true);
    setError("");
    setRelatorioData(null);

    try {
      let result;

      switch (tipoRelatorio) {
        case "minhas":
          result = await getMinhasInspecoes();
          break;
        case "gravissima":
          result = await getInspecoesPorGravidade("GRAVISSIMA");
          break;
        case "grave":
          result = await getInspecoesPorGravidade("GRAVE");
          break;
        case "moderada":
          result = await getInspecoesPorGravidade("MODERADA");
          break;
        case "leve":
          result = await getInspecoesPorGravidade("LEVE");
          break;
        case "deletadas":
          result = await getInspecoesDeletadas();
          break;
        case "pendente":
          result = await getInspecoesPorStatus("PENDENTE");
          break;
        case "em_andamento":
          result = await getInspecoesPorStatus("EM_ANDAMENTO");
          break;
        case "concluida":
          result = await getInspecoesPorStatus("CONCLUIDA");
          break;
        default:
          setError("Tipo de relatório não reconhecido");
          return;
      }

      if (result.success) {
        setRelatorioData(result.data);
      }
    } catch (err) {
      setError("Erro ao gerar relatório. Tente novamente.");
      console.error("Erro ao gerar relatório:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar para PDF (simulação)
  const handleExportarPDF = () => {
    if (!relatorioData) {
      setError("Gere um relatório primeiro");
      return;
    }

    // Aqui você pode implementar a lógica real de exportação para PDF
    // Por exemplo, usando bibliotecas como jsPDF ou fazendo uma requisição ao backend
    const link = document.createElement("a");
    link.href = "#"; // Substituir por URL real ou blob do PDF
    link.download = `relatorio_${tipoRelatorio}_${new Date().toISOString()}.pdf`;
    setError("");
    alert("Funcionalidade de exportação em desenvolvimento");
  };

  // Função para exportar para Excel/CSV
  const handleExportarExcel = () => {
    if (!relatorioData) {
      setError("Gere um relatório primeiro");
      return;
    }

    // Converter dados para CSV
    const csvContent = convertToCSV(relatorioData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `relatorio_${tipoRelatorio}_${new Date().toISOString()}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setError("");
  };

  // Função auxiliar para converter dados para CSV
  const convertToCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Adicionar cabeçalho
    csvRows.push(headers.join(","));

    // Adicionar dados
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header];
        return typeof value === "string" ? `"${value}"` : value;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
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
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 mt-3 sm:m-5">
        <div className="bg-[#F8F8F8] rounded-xl shadow p-8 mb-8 mr-10 sm:mr-0 border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Gerar Relatório</h2>
          <p className="mb-6 text-gray-600">
            Selecione os parâmetros para gerar seu relatório
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-8 mb-6 font-light">
            <div className="flex-1">
              <label className="block font-medium mb-1">
                Tipo de Relatório
              </label>
              <select
                className="w-full px-2 py-1 border border-gray-200 rounded-lg bg-white text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700"
                value={tipoRelatorio}
                onChange={(e) => setTipoRelatorio(e.target.value)}
              >
                <option value="">Selecione um tipo</option>
                <option value="minhas">Minhas inspeções</option>
                <option value="gravíssimo">Inspeção gravíssima</option>
                <option value="grave">Inspeção grave</option>
                <option value="moderada">Inspeção moderada</option>
                <option value="leve">Inspeção leve</option>
                <option value="pendente">Status: Pendente</option>
                <option value="em_andamento">Status: Em andamento</option>
                <option value="concluida">Status: Concluída</option>
                <option value="deletadas">Inspeções deletadas</option>
              </select>
            </div>
          </div>

          <button
            className="w-full flex bg-white items-center justify-center gap-2 border border-stone-300 py-1 rounded-lg hover:bg-green-600 hover:text-white transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleGerarRelatorio}
            disabled={loading}
          >
            <span>
              <IoDocumentTextOutline />
            </span>
            {loading ? "Gerando..." : "Gerar Relatório"}
          </button>

          {relatorioData && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Resultado do Relatório
              </h3>
              <p className="text-gray-600 mb-4">
                Total de registros:{" "}
                {Array.isArray(relatorioData) ? relatorioData.length : 0}
              </p>

              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={handleExportarPDF}
                >
                  <GoDownload />
                  Exportar PDF
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={handleExportarExcel}
                >
                  <TbChartInfographic />
                  Exportar Excel
                </button>
              </div>

              {/* Tabela de preview dos dados */}
              <div className="mt-6 overflow-auto rounded border border-stone-200 w-full h-85 font-light shadow">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white border-b border-stone-200">
                      {Array.isArray(relatorioData) &&
                        relatorioData.length > 0 &&
                        Object.keys(relatorioData[0]).map((key) => (
                          <th key={key} className="px-4 py-3 text-left">
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(relatorioData) &&
                      relatorioData.slice(0, 10).map((row, index) => (
                        <tr key={index} className="border-b border-stone-200">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="px-4 py-4">
                              {typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {Array.isArray(relatorioData) && relatorioData.length > 10 && (
                <p className="text-sm text-gray-500 mt-2">
                  Mostrando 10 de {relatorioData.length} registros
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
