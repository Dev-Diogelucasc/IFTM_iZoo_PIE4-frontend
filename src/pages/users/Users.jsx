import SideBar from "../../components/sideBar/SideBar";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UpdateUsers from "./updateUsers/UpdateUsers";
import { ToastContainer, toast } from "react-toastify";
import { getUser, deleteUser } from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [loadUpdateUser, setLoadUpdateUser] = useState(null);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const navigate = useNavigate();

  const notifyDelete = () => toast("Usuário excluido com sucesso! ");

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUser();
      console.log("Response from API:", response);

      if (response && response.success && response.data) {
        console.log("Users data:", response.data);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setUsers(response);
      }
    } catch (error) {
      console.error("Erro completo:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  };

  // Bloqueia acesso se não for ADMIN
  if (user?.cargo !== "ADMIN") {
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
            Gerenciar Usuários
          </h2>
          <span className="text-sm text-gray-500 font-light">
            Administre usuários e permissões do sistema
          </span>
        </div>

        <div className="w-full mb-8 mr-15 md:mr-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Total de Usuários</p>
              <span className="font-semibold text-2xl">{users.length}</span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Admin</p>
              <span className="font-semibold text-2xl">
                {users.filter((user) => user.cargo === "ADMIN").length}
              </span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Agentes</p>
              <span className="font-semibold text-2xl">
                {users.filter((user) => user.cargo === "AGENT").length}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mb-12 mr-15 md:mr-0 min-w-0">
          <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900">
                Lista de Usuários
              </h3>
              <span className="text-gray-500 text-sm">
                Gerencie os usuários cadastrados no sistema
              </span>
            </div>

            {loading && (
              <div className="text-center py-6 text-gray-500">
                Carregando usuários...
              </div>
            )}

            {error && (
              <div className="text-center py-6 text-red-500">{error}</div>
            )}

            <div className="overflow-auto rounded border border-stone-200 w-full h-85 font-light shadow">
              <table className="w-full ">
                <thead>
                  <tr className="bg-white border-b border-stone-200">
                    <th className="px-4 py-3 text-left">Login</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Cargo</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading && users.length === 0 ? (
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
                        <td className="px-4 py-4">{obj.login}</td>
                        <td className="px-4 py-4">{obj.email}</td>
                        <td className="px-4 py-4">{obj.cargo}</td>
                        <td className="px-4 py-4">{obj.telefone}</td>
                        <td className="px-4 py-4 flex gap-3">
                          <BiEdit
                            className="cursor-pointer"
                            onClick={() => {
                              setOpenUpdateUser(true);
                              setLoadUpdateUser(obj);
                            }}
                          />
                          <FaRegTrashAlt
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(obj.id);
                              notifyDelete();
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {openUpdateUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-transparent p-6 mx-4">
              <UpdateUsers
                userLoad={loadUpdateUser}
                onClose={() => setTimeout(() => setOpenUpdateUser(false), 600)}
                loadUsers={loadUsers}
              />
            </div>
          </div>
        )}
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Users;
