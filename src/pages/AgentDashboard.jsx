import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import RegisterResident from "./components/agent/RegisterResident";
import NewService from "./components/agent/NewService";
import ServiceMap from "./components/ServiceMap";


export default function AgentDashboard() {

    const navigate = useNavigate();
    const[searchParams] = useSearchParams();
    const login = searchParams.get("login");
    const password = searchParams.get("password");
    const accesslevel = searchParams.get("accesslevel");
    
    const [selected, setSelected] = useState("")

    const componentsMap = {
        newService: NewService,
        registerResident: RegisterResident,
        serviceMap: ServiceMap
    }
    const SelectedComponent = componentsMap[selected]

    return (
        <div className="w-screen h-screen bg-blue-400 flex flex-row justify-center p-6 items-center gap-4">
            <div className="max-w-sm space-y-2">
                
                <Title>Olá, agente!</Title>
                
                <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
                    <Button
                        onClick={()=> setSelected("newService")}
                    >
                        Novo Atendimento
                    </Button>
                    <Button
                        onClick={()=> setSelected("registerResident")}
                    >
                        Cadastrar Morador
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