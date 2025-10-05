import React, { useEffect } from "react";
import SideBar from "../../components/sideBar/SideBar";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  // login, email, cargo, telefone
  const { users: authUsers } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const response = await authUsers();
        const data = response?.data ?? response
        setUsers(data)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };
    load();
    console.log("authUsers:", authUsers);
  }, [authUsers]);

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
        <div className="w-full mb-8 mr-10 md:mr-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Total de Usuários</p>
              <span className="font-semibold text-2xl">5</span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Usuários Ativos</p>
              <span className="font-semibold text-2xl">5</span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Admin</p>
              <span className="font-semibold text-2xl">5</span>
            </div>
            <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-5 h-36 flex flex-col justify-between">
              <p className="font-light">Agentes</p>
              <span className="font-semibold text-2xl">5</span>
            </div>
          </div>
        </div>

        <div className="w-full mb-12 mr-10 md:mr-0 min-w-0">
          <div className="bg-[#F8F8F8] border border-gray-200 rounded shadow p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900">
                Lista de Usuários
              </h3>
              <span className="text-gray-500 text-sm">
                Gerencie os usuários cadastrados no sistema
              </span>
            </div>

            <div className="overflow-x-auto  rounded border border-stone-200 w-full font-light shadow">
              <table className="w-full min-w-[700px] ">
                <thead>
                  <tr className="bg-white border-b border-stone-200">
                    <th className="px-4 py-3 text-left">Login</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Cargo</th>
                    <th className="px-4 py-3 text-left">Telefone</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length === 0 ? (
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
                        <td className="px-4 py-4">{obj.login ?? obj.nome}</td>
                        <td className="px-4 py-4">{obj.email}</td>
                        <td className="px-4 py-4">{obj.cargo}</td>
                        <td className="px-4 py-4">{obj.telefone}</td>
                        <td className="px-4 py-4">{obj.status}</td>
                        <td className="px-4 py-4 flex gap-3">
                          <BiEdit className="cursor-pointer" />
                          <FaRegTrashAlt className="cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;
