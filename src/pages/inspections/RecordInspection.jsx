import { useState } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { IoCameraOutline } from "react-icons/io5";
import { LuHousePlus } from "react-icons/lu";
import ScannerQr from "../../components/scannerQr/ScannerQr";

const RecordInspection = () => {
  const [openQr, setOpenQr] = useState(false)

  return (
    <div className="flex">
      <SideBar />
      <main className="relative flex-1 min-w-0 flex flex-col ml-2 items-center px-3 md:px-8 mt-6">
        <div className="w-full mb-6 mr-15 md:mr-0 flex justify-between">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Registar Inspeção
            </h2>
            <span className="text-sm text-gray-500 font-light">
              Preencha os dados da nova inspeção
            </span>
          </div>
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
                onClick={() => {
                  setOpenQr(true)
                }}
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

          {openQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-transparent p-6 mx-4">
              <ScannerQr onClose={() => setOpenQr(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecordInspection;
