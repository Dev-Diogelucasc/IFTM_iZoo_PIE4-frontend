import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import { IoCameraOutline } from "react-icons/io5";

const RecordInspection = () => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 min-w-0 flex flex-col items-center px-3 md:px-8 mt-6">
        <div className="w-full mb-6 mr-10 md:mr-0">
          <h2 className="font-medium text-lg text-gray-900">
            Gerenciar Usuários
          </h2>
          <span className="text-sm text-gray-500 font-light">
            Administre usuários e permissões do sistema
          </span>
        </div>
        <div className=" bg-[#F8F8F8] w-full border border-gray-200 rounded shadow p-5 mr-15 md:mr-0">
          <div className="flex flex-col mb-8">
            <span className="font-medium text-base text-gray-900">
              Dados da inspeção
            </span>
            <span className="text-sm text-gray-500 font-light">
              Informe todos os detalhes da inspeção realizada
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900 mb-1">
              Escanear Local da Inspeção
            </span>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full bg-green-50 border border-stone-300 rounded-md px-4 py-2 hover:bg-green-700 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer font-medium mb-2"
                aria-label="Escanear QR Code"
              >
                <IoCameraOutline className="text-lg" />
                <span className="text-sm">Escanear QR Code</span>
              </button>
            </div>
            <span className="text-sm text-gray-500 font-light ">
              Escaneie o QR Code do local para preencher os dados de localização
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecordInspection;
