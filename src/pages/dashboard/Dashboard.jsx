import SideBar from "../../components/sideBar/SideBar";
import { BiCheckDouble } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

const Dashboard = () => {

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" md:px-8 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visão Geral do Sistema de controle Izoo
          </p>
        </div>
        <section className="flex md:px-8">
          <div className=" w-full grid grid-cols-1 sm:crid-col-2 md:grid-cols-4 gap-4 mt-3 mr-10 sm:mr-0">
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Total de Inspeções</h2>
                <FiActivity size={23} className="text-stone-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                1,248
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Casos Ativos</h2>
                <MdOutlineReport size={23} className="text-red-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                47
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Casos Resolvidos</h2>
                <BiCheckDouble size={23} className="text-green-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                1,237
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Área Monitoradas</h2>
                <LuMapPin size={23} className="text-stone-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                23
              </span>
            </div>
          </div>
        </section>
        <section className="md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 p-6">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Inspeções Recentes
              </h2>
              <p className="text-sm text-gray-500">
                Últimas 5 inspeções registradas
              </p>
            </header>
            <ul className="divide-y divide-gray-200 border-b border-stone-300 ">
                <li className="py-4 flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      INS-001
                    </p>
                    <span className="text-sm text-gray-500">
                      Rua Dezessete, 710
                    </span>
                  </div>
                  <div className="text-right">
                    <p>
                      Concluida
                    </p>
                    <span className="text-xs text-gray-500">
                      15/01/2025
                    </span>
                  </div>
                </li>
            </ul>
          </div>

          <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 p-6">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Alertas Prioritários
              </h2>
              <p className="text-sm text-gray-500">
                Casos que requerem atenção
              </p>
            </header>
            <ul className="divide-y divide-gray-200 border-b border-stone-300">
                <li className="py-4 flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">Foco em Dengue</p>
                    <span className="text-sm text-gray-500">
                      bairro Boa Esperança
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600">
                    Alta
                  </span>
                </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
