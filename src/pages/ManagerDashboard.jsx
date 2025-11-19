import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import ServiceMap from "./components/ServiceMap";

export default function ManagerDashboard() {

    const navigate = useNavigate();
    const[searchParams] = useSearchParams();
    const login = searchParams.get("login");
    const password = searchParams.get("password");
    const accesslevel = searchParams.get("accesslevel");

    const [selected, setSelected] = useState("")


    const componentsMap = {
        serviceMap: ServiceMap
    }
    const SelectedComponent = componentsMap[selected]

    return (
        <div className="w-screen h-screen bg-blue-400 flex justify-center p-6">
            
            <div className="w-[500px] space-y-4">
                
                <Title>Olá, Admin!</Title>
                
                <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
                    <Button>
                        Gerenciar usuários
                    </Button>
                    <Button>
                        Gerar Relatórios
                    </Button>
                    <Button
                        onClick={()=> setSelected("serviceMap")}
                    >
                        Consultar mapa de atendimentos
                    </Button>
                </div>
            </div>
            <div className="w-full max-w-sm space-y-2">
                {SelectedComponent ? <SelectedComponent/> : <p></p>}
            </div>

        </div>
    )
}