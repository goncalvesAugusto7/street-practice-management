import { useEffect, useState } from "react"
import api from "../services/api"

export default function DashboardHeader() {
    const [userName, setUserName] = useState("");

    useEffect(() =>  {
        const getMyName = async () => {
            
            const responsePID = await api.get(
                "/auth/me",
                { withCredentials: true }
            )

            const response = await api.get(
                `/users/${responsePID.data.public_id}`
            )
            setUserName(response.data.name);
        };
        getMyName();
    }, [])

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                Dashboard de Atendimentos
            </h1>

            <span className="text-white/80 text-sm">
                Atualizado em tempo real<br></br>De <strong>{userName}</strong>
            </span>
        </div>
    )
}