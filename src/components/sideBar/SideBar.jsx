import { GiPlantsAndAnimals } from "react-icons/gi";
import { FiEdit, FiLogOut } from "react-icons/fi";
import {
  BsSearch,
  BsFileEarmarkText,
  BsGeoAlt,
  BsPeople,
} from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

const SideBar = () => {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const navLinkClass =
    "flex items-center px-4 py-2 mb-2 rounded transition-colors duration-200 text-gray-700 hover:bg-gray-100";

  return (
    <div>
      {!open && (
        <IoIosMenu
          onClick={() => setOpen(true)}
          className="cursor-pointer m-4 hover:bg-green-800 hover:text-white rounded"
          size={30}
        />
      )}
      {open && (
        <aside className=" bg-[#F8F8F8] h-screen w-64 border-r border-gray-200 flex flex-col justify-between shadow">
          <div>
            <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
              <GiPlantsAndAnimals size={28} className="text-green-700" />
              <span className="text-lg font-semibold text-gray-800">Izoo</span>
              <IoIosClose
                onClick={() => setOpen(false)}
                className="ml-auto cursor-pointer hover:bg-green-800 hover:text-white rounded"
                size={30}
              />
            </div>
            <nav className="mt-4 flex flex-col">
              <NavLink to="/dashboard" className={navLinkClass}>
                <GrHomeRounded size={20} />
                <span className="ml-3">Dashboard</span>
              </NavLink>
              <NavLink to="/inspecoes/registar" className={navLinkClass}>
                <FiEdit size={20} />
                <span className="ml-3">Registrar Inspeção</span>
              </NavLink>
              <NavLink to="/inspecoes/consultar" className={navLinkClass}>
                <BsSearch size={20} />
                <span className="ml-3">Consultar Inspeções</span>
              </NavLink>
              <NavLink to="/relatorios" className={navLinkClass}>
                <BsFileEarmarkText size={20} />
                <span className="ml-3">Relatórios</span>
              </NavLink>
              <NavLink to="/mapeamento" className={navLinkClass}>
                <BsGeoAlt size={20} />
                <span className="ml-3">Mapeamento</span>
              </NavLink>
              <NavLink to="/usuarios" className={navLinkClass}>
                <BsPeople size={20} />
                <span className="ml-3">Gerenciar Usuários</span>
              </NavLink>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 m-6 border border-gray-300 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-200 text-gray-700"
          >
            <FiLogOut size={20} />
            <span>Sair</span>
          </button>
        </aside>
      )}
    </div>
  );
};

export default SideBar;
