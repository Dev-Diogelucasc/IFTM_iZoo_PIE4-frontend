import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { LuMapPinHouse } from "react-icons/lu";

const Mapping = () => {

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" px-4 md:px-8 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Mapeamento de Ocorrências
          </h1>
          <p className="text-sm text-gray-500">
            Visualização geográfica dos casos registrados
          </p>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Mapa (esquerda) */}
          <div className="flex-1 p-4 md:p-6">
            <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 h-full min-h-[400px] lg:min-h-0 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Mapa de Ocorrências</h2>
                <p className="text-sm text-gray-500">
                  Visualização geográfica dos casos registrados
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 p-4 md:p-6 lg:border-l border-gray-200 overflow-y-auto overflow-x-auto">
            {/* Ocorrências Recentes */}
            <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 p-4 mb-6">
              <h3 className="font-bold text-lg mb-3">Ocorrências Recentes</h3>
              <p className="text-sm text-gray-500 mb-4">
                Últimas ocorrências cadastradas
              </p>
              <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-3 h-3 rounded-full mt-1">
                      <LuMapPinHouse />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">tipo</p>
                      <p className="text-xs text-gray-500">endereco</p>
                      <span>status</span>
                    </div>
                  </div>
              </div>
            </div>

            <div className="space-y-3">
                <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Área Mais Afetada</p>
                  <p className="text-lg font-bold text-gray-900">Bairro Centro</p>
                  <p className="text-xs text-gray-400">47 ocorrências registadas</p>
                </div>
                <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Tipo mais Comum</p>
                  <p className="text-lg font-bold text-gray-900">Foco de Dengue</p>
                  <p className="text-xs text-gray-400">38% do total de casos</p>
                </div>
                <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Raio de Cobertura</p>
                  <p className="text-lg font-bold text-gray-900">23Km²</p>
                  <p className="text-xs text-gray-400">Área monitorada</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mapping;
