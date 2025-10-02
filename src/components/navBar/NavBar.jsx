import React from "react";
import { BsActivity } from "react-icons/bs";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between p-5 border-b-1 bg-[#F8F8F8] border-stone-300">
      <Link to="/">
        <div className="flex items-center gap-2">
          <div className="bg-green-800 h-8 w-8 rounded flex items-center justify-center">
            <BsActivity className="text-white h-7 w-6" />
          </div>
          <span className="text-2xl">Izoo</span>
          {/* <span>Gestão e Monitoramento</span> */}
        </div>
      </Link>
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
    </nav>
  );
};

export default NavBar;
