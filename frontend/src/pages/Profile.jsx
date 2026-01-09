import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import medico from '../assets/medico.svg'
import api from '../services/api';
import { ArrowLeftCircle, Trash2 } from 'lucide-react';
import { deleteUser } from '../services/userService'

export default function Profile() {
    const { public_id } = useParams();
    const [showConfirm,setShowConfirm] = useState(false)
    //const [formatedCPF,setFormatedCPF] = useState('')
    const navigate = useNavigate();
    const [user,setUser] = useState({});

    const handleDelete = () => {
        setShowConfirm(!showConfirm)
    }

    const formatedCPF = (cpf) => {
        if(!cpf) return '';

        const digits = cpf.replace(/\D/g, '');

        if (digits.length !== 11) {
            throw new Error('CPF deve ter 11 dígitos')
        }

        return digits.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        )
    }

    const deleteCurrentUser = async () =>{
        try{
            await deleteUser(public_id)
            console.log("Usuário excluído");
            alert("Usuário excluído")
            navigate(-1)
        } catch(error) {
            if (error.response) {
                console.error("API: ",error.response.data.error);
            } else {
                console.error("Erro inesperado: ",error.message);
                
            }
        }
    }

    const hasProfilePicture =
        user.profile_picture &&
        user.profile_picture !== "None" &&
        user.profile_picture !== "none";


    useEffect(() => {
        const data = async() => {
            await api.get(`/users/${public_id}`)
            .then((response) => {
                console.log(response);
                setUser(response.data)
                //setFormatedCPF()
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
                    <div className='bg-white p-1 rounded-full shadow-lg mb-3 overflow-hidden'>
                        <img src={
                                hasProfilePicture
                                ? `/api/users/${user.public_id}/profile-picture/`
                                : medico
                            } 
                            alt="foto do usuário" 
                            className='w-24 h-24 rounded-full object-cover'/>
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
                            <InfoField label="CPF" value={formatedCPF(user.cpf)}/>
                            <InfoField label="Nível de Acesso" value={user.access_level} isBadge/>
                            
                        </div>
                    </div>

                    <div className='px-6 pb-6 flex justify-center'>
                        <button
                        onClick={handleDelete}
                        className="
                            inline-flex items-center justify-center
                            gap-2 px-4 py-2
                            rounded-xl
                            border border-red-300
                            text-red-600 font-semibold
                            uppercase tracking-wide text-sm
                            hover:bg-red-50 hover:border-red-400
                            focus:outline-none focus:ring-2 focus:ring-red-400
                            transition-colors
                        "
                        >
                            <Trash2 size={16} />
                            Excluir Usuário
                    </button>
                    </div>

                </div>

                {showConfirm && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-2">
                            Confirmar exclusão
                        </h2>
                        <p className="text-sm text-slate-600 mb-6">
                            Essa ação não poderá ser desfeita.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600"
                            >
                            Cancelar
                            </button>
                            <button
                            onClick={deleteCurrentUser}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                            >
                            Excluir
                            </button>
                        </div>
                        </div>
                    </div>
                    )}

            </div>
        </div>
    )
}