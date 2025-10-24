import SideBar from "../../components/sideBar/SideBar";
import { BiCheckDouble } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getAllInspecoes, getAllEnderecos } from "../../services/api";

const Dashboard = () => {
  const [inspections, setInspections] = useState([]);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllInspecoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllInspecoes();
        console.log("Response From API: ", response);
        setInspections(response?.data ?? response);
      } catch (error) {
        console.error("Erro ao buscar inspeções: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }

      try {
        const responseAddress = await getAllEnderecos();
        console.log("Response From API (enderecos):", responseAddress);
        setAddress(responseAddress?.data ?? responseAddress);
      } catch (errorAddr) {
        console.error("Erro ao buscar endereço", errorAddr);
      }
    };

    fetchAllInspecoes();
  }, []);
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" md:px-8 py-4">
          <h1 className="font-medium text-lg text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Visão Geral do Sistema de controle Izoo
          </p>
        </div>
        <section className="flex md:px-8">
          <div className=" w-full grid grid-cols-1 sm:crid-col-2 md:grid-cols-4 gap-4 mt-3 mr-10 sm:mr-0">
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Total de Inspeções</h2>
                <FiActivity size={23} className="text-stone-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                {inspections.length}
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Casos Ativos</h2>
                <MdOutlineReport size={23} className="text-red-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                {
                  inspections.filter((insp) => insp.status !== "concluído")
                    .length
                }
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Casos Resolvidos</h2>
                <BiCheckDouble size={23} className="text-green-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                {
                  inspections.filter((insp) => insp.status === "concluído")
                    .length
                }
              </span>
            </div>
            <div className=" bg-[#F8F8F8] flex flex-col rounded shadow font-medium p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-stone-600">Locais Monitorados</h2>
                <LuMapPin size={23} className="text-stone-600" />
              </div>
              <span className="font-semibold mt-6 text-2xl text-stone-800">
                {address.length}
              </span>
            </div>
          </div>
        </section>
        <section className="md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 mr-10 sm:mr-0">
          <div className="bg-[#F8F8F8] rounded shadow border border-gray-200 p-6">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Inspeções Recentes
              </h2>

              <p className="text-sm text-gray-500">
                Últimas 4 inspeções registradas
              </p>

              {error && (
                <div className="text-center py-6 text-red-500">{error}</div>
              )}
            </header>
            <ul className="divide-y divide-gray-200 border-b border-stone-300 ">
              {loading && (
                <div className="text-center py-6 text-gray-500">
                  Carregando inspeções...
                </div>
              )}

              {!loading && inspections.length === 0 ? (
                <li className="py-4">
                  <span>Nenhuma Inspeção encontrada!</span>
                </li>
              ) : (
                // mapeia cada inspeção em um <li> separado (com key)
                inspections.slice(0, 4).map((insp) => {
                  const endereco = address.find(
                    (e) => e.id === insp.enderecoId
                  );
                  return (
                    <li
                      key={insp.id}
                      className="py-4 flex justify-between items-start gap-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{`ID: ${insp.id}`}</p>
                        <span className="text-sm text-gray-500">
                          {endereco ? (
                            <>
                              {endereco.rua || "N/A"},{" "}
                              {endereco.numero || "S/N"}
                              <br />
                              <span className="text-xs text-gray-500">
                                {endereco.bairro || ""}
                              </span>
                            </>
                          ) : (
                            "Endereço não disponível"
                          )}
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <span
                          className={`inline-flex gap-1 px-2 py-0.5 rounded text-[11px] ${
                            insp.status === "concluído"
                              ? "text-green-600 bg-green-50 border-green-200"
                              : insp.status === "em andamento"
                              ? "text-blue-600 bg-blue-50 border-blue-200"
                              : insp.status === "pendente"
                              ? "text-yellow-700 bg-yellow-50 border-yellow-200"
                              : insp.status === "cancelado"
                              ? "text-red-600 bg-red-50 border-red-200"
                              : "bg-gray-100 text-gray-700 ring-gray-200"
                          }`}
                        >
                          {insp.status || "—"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {insp.createdAt
                            ? new Date(insp.createdAt).toLocaleDateString(
                                "pt-BR"
                              )
                            : "15/01/2025"}
                        </span>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="bg-[#F8F8F8] rounded shadow border border-gray-200 p-6">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Alertas Prioritários
              </h2>
              <p className="text-sm text-gray-500">
                Casos que requerem atenção
              </p>
            </header>
            {(() => {
              const prioritarios = inspections.filter((insp) =>
                ["grave", "gravíssimo"].includes(insp.gravidade)
              );

              if (prioritarios.length === 0) {
                return (
                  <div className="text-center py-6 text-gray-500">
                    Nenhum alerta prioritário
                  </div>
                );
              }

              return (
                <ul className="divide-y divide-gray-200 border-b border-stone-300">
                  {prioritarios.map((insp) => {
                    const endereco = address.find(
                      (e) => e.id === insp.enderecoId
                    );

                    return (
                      <li
                        key={insp.id}
                        className="py-4 flex justify-between items-start gap-4"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {insp.tipo}
                          </p>
                          <span className="text-sm text-gray-500">
                            {endereco
                              ? `${endereco.rua || "N/A"}, ${
                                  endereco.numero || "S/N"
                                }`
                              : "Endereço não disponível"}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                            insp.gravidade === "grave"
                              ? "bg-orange-100 text-orange-800 ring-orange-200"
                              : insp.gravidade === "gravíssimo"
                              ? "bg-red-100 text-red-800 ring-red-200"
                              : "bg-gray-100 text-gray-700 ring-gray-200"
                          }`}
                        >
                          {insp.gravidade}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              );
            })()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
