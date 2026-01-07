import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "./Input";
import Loading from "./LoadingIcon"

export default function Login(props) {
    
    const navigate = useNavigate();
    
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setPassword] = useState("");
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [filledFields,setFilledFields] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        setFilledFields('')
        setLoading(true)
        
        if (!userLogin.trim() || !userPassword.trim()) {
            setLoading(false)
            setFilledFields("Preencha todos os campos")
            return
        }

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userLogin,userPassword}),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message)
                throw new Error(data.message || 'Login falhou')
            }

            localStorage.setItem('token', data.token)
            
            setLoading(false)
            
            if (data.accessLevel == 0) {
                navigate(`/admin`)
            } else if (data.accessLevel == 1) {
                navigate(`/agente`)
            } else {
                return alert("Erro ao acessar")
            }

        } catch (error) {
            setLoading(false)
        }
    }



    return (
        <div>
            <form 
                className="space-y-4 p-6 bg-blue-300 rounded-md shadow flex flex-col"
            >
                <Input 
                    type="text" 
                    placeholder="Login" 
                    onChange={(e)=> setUserLogin(e.target.value)}
                />
                <Input 
                    type="password" 
                    placeholder="Senha"
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <button
                    className="flex items-center justify-center bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? <Loading/> : 'Entrar'}
                </button>
                {error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )}
                {filledFields && (
                    <p className="text-lg text-center text-yellow-600 drop-shadow-lg">
                        {filledFields}
                    </p>
                )}
            </form>
        </div>
    )
} 

// atualizar os serviços em cada máquina
// verificar o que é do docker ou não
// botar o Degas pra funcionar
// baixar

// 1. ligar o degas e ver se funciona
    // rotina estava funcionando, só faltava colocar no cron
// 2. modificar scripts do dali para enviar para o ip do degas

// 3. verficar serviços mapeados 