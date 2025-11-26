import { useState, useEffect } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { BiEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import {
  getAllInspecoes,
  getEnderecoById,
  getUser,
  fetchInspections,
} from "../../services/api";

const Consult = () => {
  const [inspecoes, setInspecoes] = useState([]);
  const [filteredInspecoes, setFilteredInspecoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");


  // Buscar todas as inspeções ao carregar a página
  useEffect(() => {
    fetchInspecoes();
  }, []);

  // Filtrar inspeções quando houver mudanças nos filtros
  useEffect(() => {
    let filtered = [...inspecoes];

    // Filtro de busca por ID ou local
    if (searchTerm) {
      filtered = filtered.filter((inspecao) => {
        const searchLower = searchTerm.toLowerCase();
        const id = inspecao._id?.toLowerCase() || "";
        const endereco = inspecao.endereco?.rua?.toLowerCase() || "";
        const bairro = inspecao.endereco?.bairro?.toLowerCase() || "";

        return (
          id.includes(searchLower) ||
          endereco.includes(searchLower) ||
          bairro.includes(searchLower)
        );
      });
    }

    // Filtro por tipo
    if (filterTipo) {
      filtered = filtered.filter((inspecao) => inspecao.tipo === filterTipo);
    }

    // Filtro por status
    if (filterStatus) {
      filtered = filtered.filter(
        (inspecao) => inspecao.status === filterStatus
      );
    }

    setFilteredInspecoes(filtered);
  }, [searchTerm, filterTipo, filterStatus, inspecoes]);

  const fetchInspecoes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar inspeções e usuários em paralelo
      const [inspecoesData, usuariosData] = await Promise.all([
        getAllInspecoes(),
        getUser(),
      ]);

      // Criar um mapa de usuários para acesso rápido
      const usuariosMap = {};
      usuariosData.data.forEach((usuario) => {
        usuariosMap[usuario.id] = usuario.login;
      });

      // Para cada inspeção, buscar os dados completos do endereço e adicionar o login do criador
      const inspecoesComEndereco = await Promise.all(
        inspecoesData.map(async (inspecao) => {
          try {
            let enderecoCompleto = null;
            if (inspecao.enderecoId) {
              enderecoCompleto = await getEnderecoById(inspecao.enderecoId);
            }

            // Adicionar o login do usuário que criou a inspeção
            const criadoPorLogin =
              usuariosMap[inspecao.criadoPor] || "Usuário não encontrado";

            return {
              ...inspecao,
              endereco: enderecoCompleto,
              criadoPorLogin: criadoPorLogin,
            };
          } catch (err) {
            console.error(
              `Erro ao buscar endereço ${inspecao.enderecoId}:`,
              err
            );

            // Mesmo com erro no endereço, adicionar o login do criador
            const criadoPorLogin =
              usuariosMap[inspecao.criadoPor] || "Usuário não encontrado";

            return {
              ...inspecao,
              criadoPorLogin: criadoPorLogin,
            };
          }
        })
      );

      setInspecoes(inspecoesComEndereco);
      setFilteredInspecoes(inspecoesComEndereco);
    } catch (err) {
      console.error("Erro ao buscar inspeções:", err);
      setError("Erro ao carregar inspeções. Tente novamente.");
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

  const getGravidadeColor = (gravidade) => {
    const colors = {
      leve: "text-green-600 bg-green-50 border-green-200",
      moderado: "text-yellow-600 bg-yellow-50 border-yellow-200",
      grave: "text-orange-600 bg-orange-50 border-orange-200",
      gravíssimo: "text-red-600 bg-red-50 border-red-200",
    };
    return colors[gravidade] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: "text-yellow-700 bg-yellow-50 border-yellow-200",
      "em andamento": "text-blue-600 bg-blue-50 border-blue-200",
      concluído: "text-green-600 bg-green-50 border-green-200",
      cancelado: "text-red-600 bg-red-50 border-red-200",
    };
    return colors[status] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  const updateInspection = async (inspectionId, newStatus) => {
    setLoading(true);
    try {
      const response = await fetchInspections(inspectionId, {
        status: newStatus,
      });
      console.log("Resposta do backend:", response);
      setInspecoes((prev) =>
        prev.map((i) =>
          i.id === inspectionId ? { ...i, status: newStatus } : i
        )
      );
      setFilteredInspecoes((prev) =>
        prev.map((i) =>
          i.id === inspectionId ? { ...i, status: newStatus } : i
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Erro ao atualizar. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex overflow-x-hidden">
      <SideBar />
      <main className="flex-1 min-w-0 flex flex-col items-center px-3 md:px-8 mt-6">
        <div className="w-full mb-6 mr-10 md:mr-0">
          <h2 className="font-medium text-lg text-gray-900">
            Consultar Inspeções
          </h2>
          <span className="text-sm text-gray-500 font-light">
            Administre e visualize todas as inspeções do sistema
          </span>
        </div>

        <div className="w-full mb-8 mr-15 md:mr-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Total de Inspeções</p>
              <span className="font-semibold text-2xl">{inspecoes.length}</span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Pendentes</p>
              <span className="font-semibold text-2xl">
                {
                  inspecoes.filter((inspecao) => inspecao.status === "pendente")
                    .length
                }
              </span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Concluídas</p>
              <span className="font-semibold text-2xl">
                {
                  inspecoes.filter(
                    (inspecao) => inspecao.status === "concluído"
                  ).length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mb-12 mr-15 md:mr-0 min-w-0">
          <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900">
                Histórico de Inspeções
              </h3>
              <span className="text-gray-500 text-sm">
                Gerencie as inspeções registradas no sistema
              </span>
              <div className="flex flex-wrap gap-4 mt-4 mb-6">
                <div className="relative flex-1 min-w-[220px]">
                  <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Buscar por data, tipo ou local..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700"
                  />
                </div>
                <select
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="w-full md:w-auto min-w-[180px] px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700 font-light"
                >
                  <option value="">Todos os tipos</option>
                  <option value="Animal peçonhento">Animal peçonhento</option>
                  <option value="Foco de mosquito">Foco de mosquito</option>
                  <option value="Água parada">Água parada</option>
                  <option value="Lixo acumulado">Lixo acumulado</option>
                  <option value="Outros">Outros</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full md:w-auto min-w-[180px] px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700 font-light"
                >
                  <option value="">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="em andamento">Em Andamento</option>
                  <option value="concluído">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="text-center py-6 text-gray-500">
                Carregando inspeções...
              </div>
            )}

            {error && (
              <div className="text-center py-6 text-red-500">{error}</div>
            )}

            {!loading && !error && (
              <div className="overflow-x-auto rounded border h-90 overflow-y-auto border-stone-200 w-full font-light shadow">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-white border-b border-stone-200">
                      <th className="px-4 py-3 text-left">Data</th>
                      <th className="px-4 py-3 text-left">Tipo</th>
                      <th className="px-4 py-3 text-left">Local</th>
                      <th className="px-4 py-3 text-left">Criado por</th>
                      <th className="px-4 py-3 text-left">Gravidade</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Alterar Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInspecoes.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          Nenhuma inspeção encontrada
                        </td>
                      </tr>
                    ) : (
                      filteredInspecoes.map((inspecao) => (
                        <tr
                          key={inspecao._id}
                          className="border-b border-stone-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-4 text-sm">
                            {formatDate(inspecao.createdAt)}
                          </td>
                          <td className="px-4 py-4 text-sm">{inspecao.tipo}</td>
                          <td className="px-4 py-4 text-sm">
                            {inspecao.endereco?.rua || "N/A"},{" "}
                            {inspecao.endereco?.numero || "S/N"}
                            <br />
                            <span className="text-xs text-gray-500">
                              {inspecao.endereco?.bairro || ""}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            {inspecao.criadoPorLogin || "N/A"}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs border ${getGravidadeColor(
                                inspecao.gravidade
                              )}`}
                            >
                              {inspecao.gravidade?.charAt(0).toUpperCase() +
                                inspecao.gravidade?.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                                inspecao.status
                              )}`}
                            >
                              {inspecao.status?.charAt(0).toUpperCase() +
                                inspecao.status?.slice(1)}
                            </span>
                          </td>
                          <td>
                            <select
                              className="w-auto px-1 py-1 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700 font-light"
                              value={inspecao.status}
                              onChange={(e) =>
                                updateInspection(inspecao.id, e.target.value)
                              }
                            >
                              <option value="">Alterar Status</option>
                              <option value="pendente">Pendente</option>
                              <option value="em andamento">Em Andamento</option>
                              <option value="concluído">Concluído</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consult;
