import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { TbChartInfographic } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Função para baixar PDF (simulação)
  const handleDownload = (nome) => {
    // Se tiver um endpoint, use fetch/axios e crie um blob para download
    // Aqui vamos simular baixando um arquivo estático
    const link = document.createElement("a");
    link.href = "/exemplo.pdf"; // coloque o caminho do seu PDF real
    link.download = `${nome}.pdf`;
    link.click();
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 mt-3 ">
        <div className="bg-[#F8F8F8] rounded-xl shadow p-8 mb-8 mr-10 sm:mr-0 border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Gerar Novo Relatório</h2>
          <p className="mb-6 text-gray-600">
            Selecione os parâmetros para gerar seu relatório
          </p>
          <div className="flex gap-8 mb-6 font-light">
            <div className="flex-1">
              <label className="block font-medium mb-1">
                Tipo de Relatório
              </label>
              <select className="w-full px-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700">
                <option value="">Relatorio Geral</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Período</label>
              <select className="w-full px-2 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700">
                <option value="">Ultimos 30 dias</option>
              </select>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 border border-stone-300 py-2 rounded-lg hover:bg-green-600 hover:text-white transition cursor-pointer">
            <span>
              <IoDocumentTextOutline />
            </span>
            Gerar Relatório
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mr-10 sm:mr-0 ">
          {/* Card 1 */}
          <div className="bg-[#F8F8F8] rounded-xl border border-gray-200 shadow p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons text-green-600">
                <TbChartInfographic size={25} />
              </span>
              <span className="font-bold text-lg">Relatório Mensal</span>
            </div>
            <div className="text-gray-500 mb-2">Janeiro 2025</div>
            <div className="text-gray-700 text-sm mb-4">
              Total de inspeções: 284 <br />
              Casos resolvidos: 267
            </div>
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-green-600  hover:text-white transition-colors cursor-pointer"
              onClick={() => handleDownload("relatorio-mensal")}
            >
              <span>
                <GoDownload />
              </span>
              Baixar PDF
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-[#F8F8F8] rounded-xl border border-gray-200 shadow p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons text-green-700">
                <AiOutlineSchedule size={25} />
              </span>
              <span className="font-bold text-lg">Por Tipo</span>
            </div>
            <div className="text-gray-500 mb-2">Distribuição de casos</div>
            <div className="text-gray-700 text-sm mb-4">
              Análise por categoria <br />
              Período: Último trimestre
            </div>
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-green-600  hover:text-white transition-colors cursor-pointer"
              onClick={() => handleDownload("relatorio-tipo")}
            >
              <span>
                <GoDownload />
              </span>
              Baixar PDF
            </button>
          </div>
          {/* <div className="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons text-green-700">trending_up</span>
              <span className="font-bold text-lg">Tendências</span>
            </div>
            <div className="text-gray-500 mb-2">Análise temporal</div>
            <div className="text-gray-700 text-sm mb-4">
              Evolução dos casos <br />
              Período: Último ano
            </div>
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:border-green-700 transition-colors"
              onClick={() => handleDownload("relatorio-tendencias")}
            >
              <span>
                <GoDownload />
              </span>
              Baixar PDF
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Reports;
