import { useState, useEffect} from "react";
import SideBar from "../../components/sideBar/SideBar";
import { LuMapPinHouse } from "react-icons/lu";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Importa a biblioteca Leaflet para o ícone
import { getAllEnderecos } from "../../services/api";
import { getAllInspecoes } from "../../services/api";

// Ícone customizado usando a imagem house.png
const addressIcon = new L.Icon({
  iconUrl: "/green-house.png",
  iconSize: [16, 16],
  iconAnchor: [8, 16],
  popupAnchor: [0, -16],
});

// Componente para centralizar o mapa na nova localização
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

// Redimensiona o mapa quando o contêiner/layout muda
function AutoResize() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const handle = () => map.invalidateSize();
    handle(); // corrige no primeiro paint
    window.addEventListener("resize", handle);
    const ro = new ResizeObserver(handle);
    ro.observe(map.getContainer());
    return () => {
      window.removeEventListener("resize", handle);
      ro.disconnect();
    };
  }, [map]);
  return null;
}

const Mapping = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inspections, setInspections] = useState([]);

  // Função para calcular o centro do mapa baseado nos endereços
  const calcularCentroMapa = (enderecos) => {
    if (enderecos.length === 0) {
      // Centro padrão caso não haja endereços (Uberlândia, MG)
      return [-18.985337423035922, -49.46011821460671];
    }

    const somaLat = enderecos.reduce(
      (acc, endereco) => acc + endereco.latitude,
      0
    );
    const somaLng = enderecos.reduce(
      (acc, endereco) => acc + endereco.longitude,
      0
    );

    return [somaLat / enderecos.length, somaLng / enderecos.length];
  };

  const mapCenter = calcularCentroMapa(enderecos);

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        setCarregando(true);
        setErro("");
        const data = await getAllEnderecos();
        setEnderecos(data);
        setCarregando(false);
      } catch (err) {
        console.error("Erro ao buscar endereços:", err);
        setErro("Erro ao carregar endereços do mapa.");
        setCarregando(false);
      }
    };

    fetchEnderecos();
  }, []);

  const loadInspecions = async () => {
    setLoading(true);
    setErro(null);

    try {
      const response = await getAllInspecoes();
      console.log("Response from API:", response);

      if (response && response.success && response.data) {
        console.log("Users data:", response.data);
        setInspections(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setInspections(response);
      }
    } catch (error) {
      console.error("Erro completo:", error);
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInspecions();
  }, []);

  let conteudoMapa;
  if (carregando) {
    conteudoMapa = <p className="p-4">Carregando endereços do mapa...</p>;
  } else if (erro) {
    conteudoMapa = <p className="p-4 text-red-600">Erro: {erro}</p>;
  } else if (enderecos.length > 0) {
    const zoom = 11;

    // Define o mapa OpenStreetMap usando react-leaflet
    conteudoMapa = (
      <div className="w-full z-30 h-full">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={mapCenter} zoom={zoom} />
          <AutoResize />

          {/* Creditos do OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcadores para cada endereço */}
          {enderecos.map((endereco) => (
            <Marker
              key={endereco.id}
              position={[endereco.latitude, endereco.longitude]}
              icon={addressIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong>
                    {endereco.rua}, {endereco.numero}
                  </strong>
                  <br />
                  <span className="text-gray-600">{endereco.bairro}</span>
                  <br />
                  <span className="text-gray-500">
                    {endereco.cidade} - {endereco.estado}
                  </span>
                  <br />
                  <span className="text-xs text-gray-400">
                    CEP: {endereco.cep}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  } else {
    // Caso não tenha endereços cadastrados
    conteudoMapa = (
      <p className="p-4 text-gray-500">
        Nenhum endereço cadastrado para exibir no mapa.
      </p>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 flex flex-col mr-8 sm:mr-0">
        {/* Header */}
        <div className=" md:px-8 py-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Mapeamento de Ocorrências
          </h1>
          <p className="text-sm text-gray-500">
            Visualização geográfica dos casos registrados
          </p>
        </div>

        <div className="flex flex-col lg:flex-row flex-1">
          {/* Mapa (esquerda) */}
          <div className="flex-1 md:p-6">
            <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 h-full min-h-[400px] lg:min-h-0 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Mapa de Ocorrências</h2>
                <p className="text-sm text-gray-500">
                  Visualização geográfica dos casos registrados
                </p>
              </div>
              <div className="flex-1">{conteudoMapa}</div>
            </div>
          </div>

          {erro && <div className="text-center py-6 text-red-500">{erro}</div>}
          <div className="w-full lg:w-96 py-3 md:p-6 lg:border-l border-gray-200 overflow-y-auto overflow-x-auto">
            {/* Ocorrências Recentes */}
            <div className="bg-[#F8F8F8] rounded-xl shadow border border-gray-200 p-4 mb-6">
              <h3 className="font-bold text-lg mb-3">Ocorrências Recentes</h3>
              <p className="text-sm text-gray-500 mb-4">
                Últimas ocorrências cadastradas
              </p>
              <div className="space-y-3 h-80 overflow-y-auto">
                {loading && (
                  <div className="text-center py-6 text-gray-500">
                    Carregando Inspeções...
                  </div>
                )}
                {inspections.map((obj) => (
                  <div
                    key={obj.id}
                    className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-3 h-3 rounded-full mt-1">
                      <LuMapPinHouse key={obj.id} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{obj.tipo}</p>
                      <p className="text-xs text-gray-500">{obj.enderecoId}</p>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] ${
                          obj.status === "concluído"
                            ? "text-green-600 bg-green-50 border-green-200"
                            : obj.status === "em andamento"
                            ? "text-blue-600 bg-blue-50 border-blue-200"
                            : obj.status === "pendente"
                            ? "text-yellow-700 bg-yellow-50 border-yellow-200"
                            : obj.status === "cancelado"
                            ? "text-red-600 bg-red-50 border-red-200"
                            : "bg-gray-100 text-gray-700 ring-gray-200"
                        }`}
                      >
                        {obj.status || "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                <p className="text-xs text-gray-500 mb-1">Área Mais Afetada</p>
                <p className="text-lg font-bold text-gray-900">Bairro Centro</p>
                <p className="text-xs text-gray-400">
                  47 ocorrências registadas
                </p>
              </div>
              <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                <p className="text-xs text-gray-500 mb-1">Tipo mais Comum</p>
                <p className="text-lg font-bold text-gray-900">
                  Foco de Dengue
                </p>
                <p className="text-xs text-gray-400">38% do total de casos</p>
              </div>
              <div className="bg-[#F8F8F8] rounded-lg shadow-sm border border-gray-200 p-3">
                <p className="text-xs text-gray-500 mb-1">Raio de Cobertura</p>
                <p className="text-lg font-bold text-gray-900">23Km²</p>
                <p className="text-xs text-gray-400">Área monitorada</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mapping;
