import { GiPlantsAndAnimals } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  // Função para Deslogar o acesso
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between p-5 border-b-1 bg-[#F8F8F8] border-stone-300">
      <Link to="/">
        <div className="flex items-center gap-2">
          <div className="bg-green-800 h-8 w-8 rounded flex items-center justify-center">
            <GiPlantsAndAnimals className="text-white h-7 w-6" />
          </div>
          <span className="text-2xl">Izoo</span>
          {/* <span>Gestão e Monitoramento</span> */}
        </div>
      </Link>

      {/* Se o Usuário estiver autenticado */}
      {isAuthenticated() ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            Olá, <span className="font-semibold text-green-600">{user?.login}</span>
          </span>
          <button
            onClick={handleLogout}
            className="rounded border border-stone-300 px-3 py-1 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-500 ease-in-out cursor-pointer font-light"
          >
            Sair
          </button>
        </div>
        // Senão
      ) : (
        <div className="flex gap-2">
          <Link to="/login">
            <button className="rounded border border-stone-300 px-3 py-1 hover:bg-green-700 hover:text-white transition-colors duration-500 ease-in-out cursor-pointer font-light">
              Login
            </button>
          </Link>
          <Link to="/cadastro">
            <button className="rounded border border-stone-300 px-3 py-1 bg-green-800 text-white hover:bg-green-700 transition-colors duration-500 ease-in-out cursor-pointer font-light">
              Cadastrar
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
