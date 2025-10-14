import { FiEdit } from "react-icons/fi";
import {
  BsSearch,
  BsFileEarmarkText,
  BsGeoAlt,
  BsPeople,
  BsPersonPlus,
  BsQrCodeScan,
} from "react-icons/bs";
import FeatureCard from "./FeatureCard/FeatureCard";
import { useNavigate } from "react-router-dom";
import Presentation from "../presentation/Presentation";
import { useAuth } from "../../contexts/AuthContext";
import { LuMapPinHouse } from "react-icons/lu";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLogged = Boolean(user);
  const cargo = user?.cargo;

  return (
    <section className="mt-6 flex flex-col items-center">
      <Presentation />
      <span className="text-2xl font-semibold mb-6">
        Funcionalidade do Sistema
      </span>
      {cargo === "ADMIN" && (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 px-4 justify-center ">
            <div className=" transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<FiEdit size={28} className="text-green-700" />}
                title="Registrar Inspeção"
                description="Cadastre novas inspeções com dados sobre ocorrências"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/inspecoes/registar")}
              />
            </div>
            <div className=" transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<BsQrCodeScan size={28} className="text-green-700" />}
                title="Consultar Endereço"
                description="Consulte as ultimas inspeções em sua residência"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/inspecoes/endereco")}
              />
            </div>
            <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<BsSearch size={28} className="text-green-700" />}
                title="Consultar Inspeções"
                description="Busque e visualize histórico completo de inspeções"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/inspecoes/consultar")}
              />
            </div>
            <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={
                  <BsFileEarmarkText size={28} className="text-green-700" />
                }
                title="Gerar Relatórios"
                description="Crie relatórios detalhados e análises estatísticas"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/relatorios")}
              />
            </div>
            <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<BsGeoAlt size={28} className="text-green-700" />}
                title="Mapeamento"
                description="Visualize geograficamente as ocorrências"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/mapeamento")}
              />
            </div>
            <div className="transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<LuMapPinHouse size={28} className="text-green-700" />}
                title="Gerenciar Endereço"
                description="Administre, Cadastre e Gerencie os endereços"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/endereco")}
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
          </div>
        </div>
      )}
      {cargo === "AGENT" && (
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
            <div className=" transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<BsQrCodeScan size={28} className="text-green-700" />}
                title="Consultar Endereço"
                description="Consulte as ultimas inspeções em sua residência"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/inspecoes/endereco")}
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
                icon={
                  <BsFileEarmarkText size={28} className="text-green-700" />
                }
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
          </div>
        </div>
      )}
      {cargo === "USER" && (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-6xl px-4 justify-center ">
            <div className=" transition-transform transform hover:scale-100 hover:-translate-y-1">
              <FeatureCard
                icon={<BsQrCodeScan size={28} className="text-green-700" />}
                title="Consultar Endereço"
                description="Consulte as ultimas inspeções em sua residência"
                buttonLabel="Acessar"
                onButtonClick={() => navigate("/inspecoes/endereco")}
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
          </div>
        </div>
      )}
      {!isLogged && (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 max-w-6xl px-4 justify-center ">
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
      )}
    </section>
  );
};

export default Home;
