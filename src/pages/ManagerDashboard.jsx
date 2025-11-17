import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import Button from "../components/Button";


export default function ManagerDashboard() {

    const navigate = useNavigate();
    const[searchParams] = useSearchParams();
    const login = searchParams.get("login");
    const password = searchParams.get("password");
    const accesslevel = searchParams.get("accesslevel");

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
                    <Button>
                        Consultar mapa de atendimentos
                    </Button>
                </div>
            </div>
            
        </div>
    )
}