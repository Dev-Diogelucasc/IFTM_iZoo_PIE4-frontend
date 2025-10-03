// Icons
// import { BsActivity } from "react-icons/bs";
// import { GiPlantsAndAnimals } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import {
  BsSearch,
  BsFileEarmarkText,
  BsGeoAlt,
  BsPeople,
  BsPersonPlus,
} from "react-icons/bs";

// Components
import FeatureCard from "../../components/FeatureCard/FeatureCard";

import { useNavigate } from "react-router-dom";
import Presentation from "../presentation/Presentation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-6 flex flex-col items-center">
      <Presentation />
      <span className="text-2xl font-semibold mb-6">
        Funcionalidade do Sistema
      </span>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 max-w-6xl px-4 justify-center ">
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<FiEdit size={28} className="text-green-700" />}
              title="Registrar Inspeção"
              description="Cadastre novas inspeções com dados detalhados sobre ocorrências de zoonose"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/inspecoes/registar")}
            />
          </div>
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<BsSearch size={28} className="text-green-700" />}
              title="Consultar Inspeções"
              description="Busque e visualize histórico completo de inspeções realizadas"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/inspecoes/consultar")}
            />
          </div>
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<BsFileEarmarkText size={28} className="text-green-700" />}
              title="Gerar Relatórios"
              description="Crie relatórios detalhados e análises estatísticas das ocorrências"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/relatorios")}
            />
          </div>
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<BsGeoAlt size={28} className="text-green-700" />}
              title="Mapeamento"
              description="Visualize geograficamente as ocorrências de zoonose na região"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/mapeamento")}
            />
          </div>
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<BsPeople size={28} className="text-green-700" />}
              title="Gerenciar Usuários"
              description="Administre permissões e controle de acesso da equipe"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/usuarios")}
            />
          </div>
          <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
            <FeatureCard
              icon={<BsPersonPlus size={28} className="text-green-700" />}
              title="Cadastro"
              description="Crie sua conta para acessar o sistema de controle"
              buttonLabel="Acessar"
              onButtonClick={() => navigate("/cadastro")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
