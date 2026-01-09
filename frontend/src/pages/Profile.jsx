import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import medico from '../assets/medico.svg'
import api from '../services/api';
import { ArrowLeftCircle } from 'lucide-react';

export default function Profile() {
    const { public_id } = useParams();
    const navigate = useNavigate();

    const [user,setUser] = useState('');

    useEffect(() => {
        const data = async() => {
            await api.get(`/users/${public_id}`)
            .then((response) => {
                console.log(response);
                setUser(response.data)
            })
            .catch((e) => console.error("Catched error: "+e))
        }
        data();
    },[]);

    function InfoField({label, value, fullWidth=false, isBadge=false}){
        return (
            <div className={`${fullWidth ? 'md:col-span-2':''} border-b border-slate-200 pb-2`}>
                <p className='text-xs font-bold text-blue-500 uppercase tracking-tight mb-1'>
                    {label}
                </p>
                {isBadge ? (
                    <span className='inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold uppercase'>
                        {value ?? 'N/A'}
                    </span>
                ) : (
                    <p className='text-slate-800 font-medium text-lg truncate'>
                        {value || '---'}
                    </p>
                )}
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-blue-400 pt-10 pb-10 px-4'>
            <div className='max-w-2xl mx-auto'>

                <button 
                    onClick={() => navigate(-1)}
                    className='flex items-center text-white/90 hover:text-white mb-4 transition-colors group'
                >
                    <ArrowLeftCircle size={20} className='mr-1.5 transform group-hover:-translate-x-1 transition-transform'/>
                    <span className='font-medium'>Voltar</span>
                </button>

                <div className='flex flex-col items-center mb-8'>
                    <div className='bg-white p-3 rounded-full shadow-lg mb-3'>
                        <img src={medico} alt="foto do usuário" className='w-16 h-16 object-contain'/>
                    </div>
                    <h1 className='text-2xl font-bold text-white uppercase tracking-wider'>
                        Perfil do Usuário
                    </h1>
                </div>

                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    <div className='p-6 md:p-8 space-y-6'>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>

                            <InfoField label="Nome" value={user.name} fullWidth/>
                            <InfoField label="E-mail" value={user.email}/>
                            <InfoField label="Login" value={user.login}/>
                            <InfoField label="CPF" value={user.cpf}/>
                            <InfoField label="Nível de Acesso" value={user.access_level} isBadge/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}