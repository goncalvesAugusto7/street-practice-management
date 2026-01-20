import { useEffect, useState, navi } from "react";
import { useNavigate } from "react-router-dom";
import RegisterResident from "./components/agent/RegisterResident";
import ConsultResidents from "./components/agent/ConsultResidents";
import NewService from "./components/agent/NewService";
import ServiceMap from "./components/ServiceMap";
import Header from "../components/Header";
import Logout from "../components/Logout";
import DashboardHeader from "../components/DashboardHeader";
import HealthIndicators from "../components/HealthIndicators";
import DailyAppointments from "../components/DailyAppointments";
import api from "../services/api";

export default function AgentDashboard() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState({});

  useEffect(() => {
    const getMyself = async () => {
      const response = await api.get(
        "/auth/me",
        { withCredentials: true }
      )

      const userResponse = await api.get(
        `/users/${response.data.public_id}`
      )

      const serviceResponse = await api.get(
        `/services/${response.data.public_id}`
      )

      setServices(serviceResponse.data);

    }
    getMyself();
  }, []);

  const componentsMap = {
    newService: NewService,
    registerResident: RegisterResident,
    consultResidents: ConsultResidents,
    serviceMap: ServiceMap,
    logout: Logout,
  };
  const componentsList = [
    { label: "Home", key: "home"},
    { label: "Novo Atendimento", key: "newService" },
    { label: "Cadastrar Morador", key: "registerResident" },
    { label: "Consultar Moradores", key: "consultResidents" },
    { label: "Consultar mapa de atendimentos", key: "serviceMap" },
    { label: "Sair", key: "logout"}
  ];
  const SelectedComponent = componentsMap[selected];

  const handleMenuItemClick = (item) => {
    if (item.key == "home") {
      navigate(0);
    } else {
      setSelected(item.key);
      setIsMenuOpen(false);
    }
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
        }}
      />

      {/* area do conteudo */}
      <main className="container mx-auto px-4 py-6 pt-20">
        {/* <Title>Olá, {login}!</Title> */}
        <div className="w-full max-w-4xl">
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <div>
              <DashboardHeader/>

              <HealthIndicators
                services={services}
              />

              <DailyAppointments 
                services={services}
              />

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
