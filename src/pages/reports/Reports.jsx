import React from 'react'
import SideBar from "../../components/sideBar/SideBar"
import { useAuth } from '../../contexts/AuthContext';
import {useNavigate } from 'react-router-dom';

const Reports = () => {
  const {user} = useAuth()
  const navigate = useNavigate()


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
    <div className='flex justify-between items-center'>
      <SideBar />
      <p>teste</p>
    </div>
  )
}

export default Reports