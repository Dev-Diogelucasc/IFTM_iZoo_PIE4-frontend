// Icons
import { BsActivity } from "react-icons/bs";
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

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-10 flex flex-col items-center">
      <span className="text-2xl font-semibold mb-6">
        Funcionalidade do Sistema
      </span>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 max-w-6xl px-4 justify-center">
          <FeatureCard
            icon={<BsActivity size={28} className="text-green-700" />}
            title="Registrar Inspeção"
            description="Cadastre novas inspeções com dados detalhados sobre ocorrências de zoonose"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/inspecoes/registar")}
          />
          <FeatureCard
            icon={<BsSearch size={28} className="text-green-700" />}
            title="Consultar Inspeções"
            description="Busque e visualize histórico completo de inspeções realizadas"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/inspecoes/consultar")}
          />
          <FeatureCard
            icon={<BsFileEarmarkText size={28} className="text-green-700" />}
            title="Gerar Relatórios"
            description="Crie relatórios detalhados e análises estatísticas das ocorrências"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/relatorios")}
          />
          <FeatureCard
            icon={<BsGeoAlt size={28} className="text-green-700" />}
            title="Mapeamento"
            description="Visualize geograficamente as ocorrências de zoonose na região"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/mapeamento")}
          />
          <FeatureCard
            icon={<BsPeople size={28} className="text-green-700" />}
            title="Gerenciar Usuários"
            description="Administre permissões e controle de acesso da equipe"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/usuarios")}
          />
          <FeatureCard
            icon={<BsPersonPlus size={28} className="text-green-700" />}
            title="Cadastro"
            description="Crie sua conta para acessar o sistema de controle"
            buttonLabel="Acessar"
            onButtonClick={() => navigate("/cadastro")}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
