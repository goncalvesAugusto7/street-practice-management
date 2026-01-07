import Title from "../../../components/Title"
import { useState, useEffect } from "react";

import Input from "../../../components/Input";
import Card from "../../../components/Card";

export default function ManageUsers() {

    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [targetUserInfo,setTargetUserInfo] = useState('')

    const getUsers = async (event) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("http://localhost:8080/api/users");
                const data = await response.json();
                
                setUsers(data)
            } catch (error) {
                console.error("Catched error: "+error)
            }
        });
    };

    useEffect(() => {
        getUsers()
    },[])

    return (
        <div className="space-y-4 p-6 bg-white rounded-md shadow flex flex-col">
            <h2 className="text-1xl font-bold text-center mb-2">
                Gerenciamento de Usuários
            </h2>
            <Input 
            type='text' 
            placeholder="Busque aqui..." 
            value={targetUserInfo} 
            onChange={(e)=>setTargetUserInfo(e.target.value)}/>

            <Card name="Augusto Gonçalves Santos" login="admin" email="augusto.santos@email.com"/>
        </div>

    )
}