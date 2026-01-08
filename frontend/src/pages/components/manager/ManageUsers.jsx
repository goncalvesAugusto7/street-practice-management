import Title from "../../../components/Title"
import { useState, useEffect } from "react";
import { PlusIcon } from 'lucide-react';


import Input from "../../../components/Input";
import Card from "../../../components/Card";
import api from "../../../services/api";

export default function ManageUsers() {

    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [targetUserInfo,setTargetUserInfo] = useState('')
    const [accessFilter,setAccessFilter] = useState(null)

    const getUsers = async (event) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get("/api/users/")
                .then((response) => {
                    console.log(response)
                    setUsers(response.data)
                })
                .catch((e)=>console.error(e));
                                
            } catch (error) {
                console.error("Catched error: "+error)
            }
        });
    };

    function formatCPF(cpf){
        return cpf.replace(/[^0-9]/g, '')
    }

    const filteredUsers = users.filter(user =>{
        const matchText =
            user.name.toLowerCase().includes(targetUserInfo.toLocaleLowerCase()) ||
            user.login.toLowerCase().includes(targetUserInfo.toLocaleLowerCase()) ||
            user.email.toLowerCase().includes(targetUserInfo.toLocaleLowerCase()) ||
            formatCPF(user.cpf).toLowerCase().includes(targetUserInfo.toLocaleLowerCase());

        const matchAccess =
            accessFilter === null || user.access_level === accessFilter;

        return matchText && matchAccess;
    });

    const filteredUsersBy = users.filter(user =>
        user.access_level
    )

    useEffect(() => {
        getUsers()
    },[])

    const FilterButton = ({ label, value, currentFilter, onClick }) => (
    <button 
        onClick={() => onClick(value)}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border
            ${currentFilter === value 
                ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'}`}
    >
        {label}
    </button>
    );

return (
    <div className="h-[600px] md:h-[495px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        

        <div className="p-6 pb-2 bg-white flex flex-col items-center">
            <h2 className="text-1xl font-bold text-slate-800 text-center mb-4">
                Gerenciamento de Usuários
            </h2>
            <Input 
                type='text' 
                placeholder="Busque aqui..." 
                value={targetUserInfo} 
                onChange={(e) => setTargetUserInfo(e.target.value)}
            />
            <div className="flex gap-2 mt-4">
                <FilterButton label={"Todos"} value={null} currentFilter={accessFilter} onClick={setAccessFilter}/>
                <FilterButton label={"Gerentes"} value={0} currentFilter={accessFilter} onClick={setAccessFilter}/>
                <FilterButton label={"Agentes"} value={1} currentFilter={accessFilter} onClick={setAccessFilter}/>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-3 custom-scrollbar">
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <div key={user.public_id || index}>
                        <Card 
                            name={user.name} 
                            login={user.login} 
                            email={user.email} 
                            public_id={user.public_id}
                        />
                    </div>
                ))
            ) : (
                <p className="text-center text-slate-400 py-10">Nenhum usuário encontrado.</p>
            )}
        </div>
        <div className="items-center flex flex-col">
            <button
                className='flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg mb-4 transition-colors shadow-sm active:scale-95'
            >
                <PlusIcon size={24}/>Adicionar
            </button>

        </div>
    </div>
);}