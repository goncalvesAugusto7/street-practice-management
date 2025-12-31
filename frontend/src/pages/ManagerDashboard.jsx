import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import ServiceMap from "./components/ServiceMap";
import ManageUsers from "./components/manager/ManageUsers";
import Header from "../components/Header";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = searchParams.get("login");
  const password = searchParams.get("password");
  const accesslevel = searchParams.get("accesslevel");

  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const componentsMap = {
    manageUsers: ManageUsers,
    serviceMap: ServiceMap,
  };
  const componentsList = [
    { label: "Gerenciar Usuários", key: "manageUsers" },
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

      {/* area de conteudo */}
      <main className="container mx-auto px-4 py-6 py-20">
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
