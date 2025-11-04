import React, { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getInspecoesPorStatus,
  getMinhasInspecoes,
  getInspecoesPorGravidade,
  getInspecoesDeletadas,
  getEnderecoById,
  getUser,
  getAllInspecoes,
} from "../../services/api";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [relatorioData, setRelatorioData] = useState(null);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  // Função para formatar data no padrão AAAA/MM/DD - HH:MM:SS
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
  };

  // Função para obter cor da gravidade
  const getGravidadeColor = (gravidade) => {
    const colors = {
      leve: "text-green-600 bg-green-50 border-green-200",
      moderado: "text-yellow-600 bg-yellow-50 border-yellow-200",
      grave: "text-orange-600 bg-orange-50 border-orange-200",
      gravíssimo: "text-red-600 bg-red-50 border-red-200",
    };
    return colors[gravidade] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  // Função para obter cor do status
  const getStatusColor = (status) => {
    const colors = {
      pendente: "text-yellow-700 bg-yellow-50 border-yellow-200",
      "em andamento": "text-blue-600 bg-blue-50 border-blue-200",
      concluído: "text-green-600 bg-green-50 border-green-200",
      cancelado: "text-red-600 bg-red-50 border-red-200",
    };
    return colors[status] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  // Função para processar e enriquecer os dados das inspeções
  const processarDadosInspecoes = async (inspecoes) => {
    try {
      // Buscar todos os usuários
      const usuariosData = await getUser();
      const usuariosMap = {};
      usuariosData.data.forEach((usuario) => {
        usuariosMap[usuario.id] = usuario.login;
      });

      // Processar cada inspeção
      const inspecoesProcessadas = await Promise.all(
        inspecoes.map(async (inspecao) => {
          try {
            // Buscar endereço completo
            let enderecoTexto = "Endereço não disponível";
            if (inspecao.enderecoId) {
              const endereco = await getEnderecoById(inspecao.enderecoId);
              if (endereco) {
                enderecoTexto = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}`;
              }
            }

            // Buscar nome do criador
            const criadoPorNome =
              usuariosMap[inspecao.criadoPor] || "Usuário não encontrado";

            return {
              id: inspecao.id || inspecao._id,
              tipo: inspecao.tipo,
              endereco: enderecoTexto,
              gravidade: inspecao.gravidade,
              status: inspecao.status,
              criadoPor: criadoPorNome,
              createdAt: formatDateTime(inspecao.createdAt),
              updatedAt: formatDateTime(inspecao.updatedAt),
            };
          } catch (err) {
            console.error("Erro ao processar inspeção:", err);
            return {
              id: inspecao.id || inspecao._id,
              tipo: inspecao.tipo,
              endereco: "Erro ao carregar",
              gravidade: inspecao.gravidade,
              status: inspecao.status,
              criadoPor: "Erro ao carregar",
              createdAt: formatDateTime(inspecao.createdAt),
              updatedAt: formatDateTime(inspecao.updatedAt),
            };
          }
        })
      );

      return inspecoesProcessadas;
    } catch (err) {
      console.error("Erro ao processar dados:", err);
      throw err;
    }
  };

  // Função para gerar relatório baseado no tipo selecionado
  const handleGerarRelatorio = async () => {
    if (!tipoRelatorio) {
      setError("Por favor, selecione um tipo de relatório");
      return;
    }

    // Validar datas se for filtro por período
    if (tipoRelatorio === "periodo") {
      if (!dataInicial || !dataFinal) {
        setError("Por favor, selecione a data inicial e final");
        return;
      }
      if (new Date(dataInicial) > new Date(dataFinal)) {
        setError("A data inicial não pode ser maior que a data final");
        return;
      }
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
          result = await getInspecoesPorGravidade("gravíssimo");
          break;
        case "grave":
          result = await getInspecoesPorGravidade("GRAVE");
          break;
        case "moderada":
          result = await getInspecoesPorGravidade("moderado");
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
          result = await getInspecoesPorStatus("em andamento");
          break;
        case "concluida":
          result = await getInspecoesPorStatus("concluído");
          break;
        case "periodo": {
          // Buscar todas as inspeções e filtrar por período
          const todasInspecoes = await getAllInspecoes();
          const dataInicialObj = new Date(dataInicial);
          const dataFinalObj = new Date(dataFinal);
          // Ajustar data final para incluir o dia completo
          dataFinalObj.setHours(23, 59, 59, 999);

          const inspecoesFiltradas = todasInspecoes.filter((inspecao) => {
            const dataInspecao = new Date(inspecao.createdAt);
            return (
              dataInspecao >= dataInicialObj && dataInspecao <= dataFinalObj
            );
          });

          result = { success: true, data: inspecoesFiltradas };
          break;
        }
        default:
          setError("Tipo de relatório não reconhecido");
          return;
      }

      if (result.success) {
        // Processar os dados para deixar mais bonitos
        const dadosProcessados = await processarDadosInspecoes(result.data);
        setRelatorioData(dadosProcessados);

        // Limpar erro se houver dados
        if (dadosProcessados && dadosProcessados.length > 0) {
          setError("");
        } else {
          setError("Nenhum dado encontrado para este relatório");
        }
      }
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
      setError("Erro ao gerar relatório. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para exportar para PDF
  const handleExportarPDF = () => {
    if (!relatorioData) {
      setError("Gere um relatório primeiro");
      return;
    }

    if (!Array.isArray(relatorioData) || relatorioData.length === 0) {
      setError("Não há dados para exportar");
      return;
    }

    try {
      // Criar nova instância do jsPDF
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Configurar título do documento
      const tipoRelatorioTexto = {
        minhas: "Minhas Inspeções",
        gravissima: "Inspeções Gravíssimas",
        grave: "Inspeções Graves",
        moderada: "Inspeções Moderadas",
        leve: "Inspeções Leves",
        pendente: "Inspeções Pendentes",
        em_andamento: "Inspeções Em Andamento",
        concluida: "Inspeções Concluídas",
        deletadas: "Inspeções Deletadas",
        periodo: `Inspeções de ${dataInicial
          .split("-")
          .reverse()
          .join("/")} até ${dataFinal.split("-").reverse().join("/")}`,
      };

      // Adicionar cabeçalho
      doc.setFontSize(18);
      doc.setTextColor(40);
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.text(
        "Izoo - Relatório de: " + tipoRelatorioTexto[tipoRelatorio] ||
          "Relatório",
        pageWidth / 2,
        15,
        { align: "center" }
      );

      // Adicionar data de geração
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Gerado em: ${new Date().toLocaleString("pt-BR")}`,
        pageWidth / 2,
        22,
        { align: "center" }
      );

      // Preparar dados para a tabela com cabeçalhos mais bonitos
      const headers = Object.keys(relatorioData[0]).map((key) => {
        const headerMap = {
          id: "ID",
          tipo: "Tipo",
          endereco: "Endereço",
          gravidade: "Gravidade",
          status: "Status",
          criadoPor: "Criado Por",
          createdAt: "Criado Em",
          updatedAt: "Atualizado Em",
        };
        return headerMap[key] || key;
      });

      const rows = relatorioData.map((row) =>
        Object.values(row).map((value) => {
          if (value === null || value === undefined) {
            return "";
          }
          if (typeof value === "object") {
            return JSON.stringify(value);
          }
          return String(value);
        })
      );

      // Importar e usar autoTable
      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 28,
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: "linebreak",
          halign: "left",
        },
        headStyles: {
          fillColor: [34, 197, 94],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [248, 248, 248],
        },
        tableLineColor: [214, 211, 209],
        tableLineWidth: 0.1,
        margin: { top: 28, left: 10, right: 10 },
      });

      // Salvar o PDF
      const fileName = `relatorio_${tipoRelatorio}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);
      setError("");
    } catch (err) {
      console.error("Erro detalhado ao gerar PDF:", err);
      setError(`Erro ao gerar PDF: ${err.message || "Tente novamente."}`);
    }
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
    <div className="flex min-h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 mt-3 sm:m-5 overflow-auto">
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
                <option value="gravissima">Inspeção gravíssima</option>
                <option value="grave">Inspeção grave</option>
                <option value="moderada">Inspeção moderada</option>
                <option value="leve">Inspeção leve</option>
                <option value="pendente">Status: Pendente</option>
                <option value="em_andamento">Status: Em andamento</option>
                <option value="concluida">Status: Concluída</option>
                <option value="deletadas">Inspeções deletadas</option>
                <option value="periodo">Filtrar por período</option>
              </select>
            </div>
          </div>

          {/* Campos de data que aparecem apenas quando "periodo" é selecionado */}
          {tipoRelatorio === "periodo" && (
            <div className="flex gap-4 mb-6 font-light">
              <div className="flex-1">
                <label className="block font-medium mb-1">Data Inicial</label>
                <input
                  type="date"
                  className="w-full px-2 py-1 border border-gray-200 rounded-lg bg-white text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1">Data Final</label>
                <input
                  type="date"
                  className="w-full px-2 py-1 border border-gray-200 rounded-lg bg-white text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                />
              </div>
            </div>
          )}

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
                          <th
                            key={key}
                            className="px-4 py-3 text-left capitalize"
                          >
                            {key === "id"
                              ? "ID"
                              : key === "tipo"
                              ? "Tipo"
                              : key === "endereco"
                              ? "Endereço"
                              : key === "gravidade"
                              ? "Gravidade"
                              : key === "status"
                              ? "Status"
                              : key === "criadoPor"
                              ? "Criado Por"
                              : key === "createdAt"
                              ? "Criado Em"
                              : key === "updatedAt"
                              ? "Atualizado Em"
                              : key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(relatorioData) &&
                      relatorioData.slice(0, 10).map((row, index) => (
                        <tr key={index} className="border-b border-stone-200">
                          {Object.entries(row).map(([key, value], i) => (
                            <td key={i} className="px-4 py-4">
                              {key === "gravidade" ? (
                                <span
                                  className={`px-3 py-1 rounded-full border text-sm font-medium ${getGravidadeColor(
                                    value
                                  )}`}
                                >
                                  {value}
                                </span>
                              ) : key === "status" ? (
                                <span
                                  className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                                    value
                                  )}`}
                                >
                                  {value}
                                </span>
                              ) : typeof value === "object" ? (
                                JSON.stringify(value)
                              ) : (
                                String(value)
                              )}
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
