import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";

export default function Login(props) {

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userAccessLevel, setUserAccessLevel] = useState(-1);
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        if (!userLogin.trim() || !userPassword.trim()) {
            return alert("Preencha todos os campos")
        }

        try {
            const response = await fetch("/api/routes");
            const data = await response.json();

            const users = data.logins;

            const userFound = users.find(
                (user) => user.login == userLogin && user.password === userPassword
            );

            if (!userFound) {
                return alert("Falha no login");
            } 

            const query = new URLSearchParams({
                login: userFound.login,
                password: userFound.password,
                accesslevel: userFound.accessLevel
            })
            
            if (userFound.accessLevel == 0) {
                navigate(`/admin?${query.toString()}`)
            } else if (userFound.accessLevel == 1) {
                navigate(`/agente?${query.toString()}`)
            } else {
                return alert("erro ao acessar")
            }

        } catch (error) {
            console.error("Error: " + error);
        }
    }

    function onSubmitClick(lo,pw,al){
        const query = new URLSearchParams();

            query.set("login",lo);
            query.set("password",pw);
            query.set("accesslevel",al);
            
            if (al === 0) {
                navigate(`/data?${query.toString()}`)
            } else if (al === 1) {
                console.log(`agente?${query.toString()}`)
                navigate(`/agente?${query.toString()}`)
            } else {
                console.error("Error ao acessar. Dados: "+lo+","+pw+","+al)
                return alert("erro ao acessar")
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
                    className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
                    onClick={handleSubmit}
                >
                    Entrar
                </button>
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