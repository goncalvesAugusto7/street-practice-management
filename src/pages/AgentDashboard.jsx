import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import RegisterResident from "./components/agent/RegisterResident";
import NewService from "./components/agent/NewService";
import ServiceMap from "./components/ServiceMap";
import Header from "../components/Header";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = searchParams.get("login");
  const password = searchParams.get("password");
  const accesslevel = searchParams.get("accesslevel");

  const [selected, setSelected] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const componentsMap = {
    newService: NewService,
    registerResident: RegisterResident,
    serviceMap: ServiceMap,
  };
  const componentsList = [
    { label: "Novo Atendimento", component: NewService },
    { label: "Cadastrar Morador", component: RegisterResident },
    { label: "Consultar mapa de atendimentos", component: ServiceMap },
  ];
  const SelectedComponent = componentsList[selected];

  const handleMenuItemClick = (item) => {
    setSelected(item.component);
    setIsMenuOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-blue-400 justify-center p-6 items-center gap-4">
      <Header
        title="Saúde na Rua"
        menuItems={componentsList}
        onMenuItemClick={handleMenuItemClick}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => {
          setIsMenuOpen(!isMenuOpen);
          console.log("foi clicado. menu aberto? " + isMenuOpen);
        }}
      />

      {/* area do conteudo */}
      <main className="container mx-auto px-4 py-6">
        <Title>Olá, {login}!</Title>
        <div className="w-full max-w-4xl">
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <p className="text-gray-500 text-center py-10">
              Selecione uma opção.
            </p>
          )}
        </div>
      </main>

      {/* <div className="max-w-sm space-y-2">
        <Title>Olá, {login}!</Title>

        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
          <Button onClick={() => setSelected("newService")}>
            Novo Atendimento
          </Button>
          <Button onClick={() => setSelected("registerResident")}>
            Cadastrar Morador
          </Button>
          <Button onClick={() => setSelected("serviceMap")}>
            Consultar mapa de atendimentos
          </Button>
        </div>
      </div> */}

      {/* <div className="w-full max-w-sm space-y-2">
        {SelectedComponent ? <SelectedComponent /> : <p></p>}
      </div> */}
    </div>
  );
}
