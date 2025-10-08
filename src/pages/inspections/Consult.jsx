import SideBar from "../../components/sideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Consult = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState()
  // const [error, setError] = useState()

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
    <div className="flex overflow-x-hidden">
      <SideBar />
      <main className="flex-1 min-w-0 flex flex-col items-center px-3 md:px-8 mt-6">
        <div className="w-full mb-6 mr-10 md:mr-0">
          <h2 className="font-medium text-lg text-gray-900">
            Consultar Inspeções
          </h2>
          <span className="text-sm text-gray-500 font-light">
            Lista Completa de todas as inspelçoes registradas
          </span>
        </div>
        <div className="w-full mb-12 mr-15 md:mr-0 min-w-0">
          <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900">
                Histórico de Inspeções
              </h3>
              <span className="text-gray-500 text-sm">
                Lista completa de todas as inspeções registradas
              </span>
              <div className="flex items-center mt-4 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Buscar por ID ou local..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700"
                />
                <select className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700 font-light">
                  <option>Todos os tipos</option>
                  <option value="DENGUE">Foco em Dengue</option>
                  <option value="ROEDORES">Roedores</option>
                  <option value="ESPCORPIAO">Escorpiões</option>
                  <option value="MORCEGO">Morcegos</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-base outline-none transition-colors duration-150 hover:border-green-700 focus:border-green-700 font-light">
                  <option>Todos os status</option>
                  <option value="PENDENTE">Pendente</option>
                  <option value="ANDAMENTO">Em Andamento</option>
                  <option value="CONCLUIDA">Pendente</option>
                </select>
              </div>
            </div>

            {/* {loading && (
              <div className="text-center py-6 text-gray-500">
                Carregando usuários...
              </div>
            )}

            {error && (
              <div className="text-center py-6 text-red-500">{error}</div>
            )} */}

            <div className="overflow-x-auto rounded border border-stone-200 w-full font-light shadow">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-white border-b border-stone-200">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Local</th>
                    <th className="px-4 py-3 text-left">Gravidade</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {/* {!loading && users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Nenhum usuário encontrado
                      </td>
                    </tr>
                  ) : (
                    users.map((obj) => (
                      <tr key={obj.id} className="border-b border-stone-200">
                        <td className="px-4 py-4">{}</td>
                        <td className="px-4 py-4">{}</td>
                        <td className="px-4 py-4">{obj}</td>
                        <td className="px-4 py-4">{obj}</td>
                        <td className="px-4 py-4 flex gap-3">
                          <BiEdit
                            className="cursor-pointer"
                            onClick={() => {
                            }}
                          />
                          <FaRegTrashAlt
                            className="cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))
                  } */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consult;
