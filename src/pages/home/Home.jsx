import { BsActivity } from "react-icons/bs";
import {
  BsSearch,
  BsFileEarmarkText,
  BsGeoAlt,
  BsPeople,
  BsPersonPlus,
} from "react-icons/bs";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

const Home = () => {
  return (
    <section className="mt-8 flex flex-col items-center">
      <span className="text-2xl font-semibold mb-6">
        Funcionalidade do Sistema
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-6xl px-4">
        <FeatureCard
          icon={<BsActivity size={28} className="text-green-700" />}
          title="Registrar Inspeção"
          description="Cadastre novas inspeções com dados detalhados sobre ocorrências de zoonose"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Acessar Inspeção")}
        />
        <FeatureCard
          icon={<BsSearch size={28} className="text-green-700" />}
          title="Consultar Inspeções"
          description="Busque e visualize histórico completo de inspeções realizadas"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Consultar Inspeções")}
        />
        <FeatureCard
          icon={<BsFileEarmarkText size={28} className="text-green-700" />}
          title="Gerar Relatórios"
          description="Crie relatórios detalhados e análises estatísticas das ocorrências"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Gerar Relatórios")}
        />
        <FeatureCard
          icon={<BsGeoAlt size={28} className="text-green-700" />}
          title="Mapeamento"
          description="Visualize geograficamente as ocorrências de zoonose na região"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Mapeamento")}
        />
        <FeatureCard
          icon={<BsPeople size={28} className="text-green-700" />}
          title="Gerenciar Usuários"
          description="Administre permissões e controle de acesso da equipe"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Gerenciar Usuários")}
        />
        <FeatureCard
          icon={<BsPersonPlus size={28} className="text-green-700" />}
          title="Cadastro"
          description="Crie sua conta para acessar o sistema de controle"
          buttonLabel="Acessar"
          onButtonClick={() => alert("Cadastro")}
        />
      </div>
    </section>
  );
};

export default Home;
