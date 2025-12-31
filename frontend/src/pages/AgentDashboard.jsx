import { useState } from "react";
import RegisterResident from "./components/agent/RegisterResident";
import NewService from "./components/agent/NewService";
import ServiceMap from "./components/ServiceMap";
import Header from "../components/Header";

export default function AgentDashboard() {
  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const componentsMap = {
    newService: NewService,
    registerResident: RegisterResident,
    serviceMap: ServiceMap,
  };
  const componentsList = [
    { label: "Novo Atendimento", key: "newService" },
    { label: "Cadastrar Morador", key: "registerResident" },
    { label: "Consultar mapa de atendimentos", key: "serviceMap" },
  ];
  const SelectedComponent = componentsMap[selected];

  const handleMenuItemClick = (item) => {
    setSelected(item.key);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col">
      <Header
        title="Saúde na Rua"
        menuItems={componentsList}
        onMenuItemClick={handleMenuItemClick}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => {
          setIsMenuOpen(!isMenuOpen);
          console.log(
            "foi clicado. menu aberto? " +
              isMenuOpen +
              ". selected: " +
              selected +
              ". lista de componentes: "
          );
          console.table(componentsList[0]);
        }}
      />

      {/* area do conteudo */}
      <main className="container mx-auto px-4 py-6 pt-20">
        {/* <Title>Olá, {login}!</Title> */}
        <div className="w-full max-w-4xl">
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <p className="text-gray-500 text-center py-10">
              Selecione uma opção do menu.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
