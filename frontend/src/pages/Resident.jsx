import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';
import { ArrowLeftCircle, Trash2, Pencil } from 'lucide-react';
import { deleteResident } from '../services/residentService'
import Loading from '../components/LoadingIcon';

export default function Profile() {
    const { public_id } = useParams();
    const [resident,setResident] = useState({});
    const [showConfirm,setShowConfirm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [clinicalHistory, setClinicalHistory] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false)
    const navigate = useNavigate();

    const handleDelete = () => {
        setShowConfirm(!showConfirm)
    }

    const deleteCurrentResident = async () =>{
        try{
            await deleteResident(public_id)
            console.log("Morador excluído");
            alert("Morador excluído")
            navigate(-1)
        } catch(error) {
            if (error.response) {
                console.error("API: ",error.response.data.error);
            } else {
                console.error("Erro inesperado: ",error.message);
            }
        }
    }

    const handleUpdateClinicalHistory = async () => {
        setLoadingEdit(true);

        try {
            await api.patch(
                `/residents/${resident.public_id}`,
                {initial_clinical_history: clinicalHistory}
            );
            setResident(prev => ({
                ...prev,
                initial_clinical_history: clinicalHistory
            }));
            
            setLoadingEdit(false);
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar histórico clínico. Tente novamente");
        }
    }

    useEffect(() => {
        const data = async() => {
            await api.get(`/residents/${public_id}`)
            .then((response) => {
                console.log(response);
                setResident(response.data);
                setClinicalHistory(response.data.initial_clinical_history || "");
            })
            .catch((e) => console.error("Catched error: "+e))
        }
        data();
    },[]);

    function InfoField({
        label, 
        value, 
        fullWidth=false, 
        isBlock=false
    }){
        return (
            <div className={`${fullWidth ? 'md:col-span-2':''} border-b border-slate-200 pb-2`}>
                <p className='text-xs font-bold text-blue-500 uppercase tracking-tight mb-1'>
                    {label}
                </p>

                {isBlock ? (
                    <span className="
                        inline-flex items-center justify-center
                        px-2.5 py-0.5 
                        text-base font-medium text-justify
                    ">
                        {value ?? 'N/A'}
                    </span>
                ) : (
                    <span className='text-slate-800 font-medium text-lg truncate'>
                        {value || '---'}
                    </span>
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
                    <h1 className='text-2xl font-bold text-white uppercase tracking-wider'>
                        Perfil do Morador
                    </h1>
                </div>

                <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                    <div className='p-6 md:p-8 space-y-6'>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>

                            <InfoField label="Nome" value={resident.name} fullWidth/>
                            <InfoField label="Nascimento" value={resident.date_of_birth}/>
                            <InfoField label="Sexo" value={resident.sex}/>

                            <div className='md:col-span-2 border-b border-slate-200 pb-2'>
                                <div className='flex items-center justify-between mb-1'>
                                    <p className='text-xs font-bold text-blue-500 uppercase tracking-tight'>
                                        Histórico Clínico Inicial
                                    </p>
                                    
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className='text-slate-400 hover:text-blue-500 transition'
                                    >
                                        <Pencil size={16}/>
                                    </button>
                                </div>

                                <span className='inline-flex items-center justify-center text-slate-800 font-medium text-base text-justify pt-4'>
                                    {resident.initial_clinical_history || '---'}
                                </span>

                            </div>
                            
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
                            Excluir Morador
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
                                {loadingEdit ? <Loading/> : "Confirmar"}
                            </button>
                            <button
                            onClick={deleteCurrentResident}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                            >
                            Excluir
                            </button>
                        </div>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">
                                Editar Histórico Clínico
                            </h2>

                            <textarea
                                value={clinicalHistory}
                                onChange={(e) => setClinicalHistory(e.target.value)}
                                rows={6}
                                maxLength={500}
                                className="w-full border rounded-lg p-3 text-sm mb-6"
                            />
                            <div className='flex justify-end'>
                                <span className={`text-xs font-medium ${clinicalHistory >= 500 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {clinicalHistory.length} / 500
                                </span>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setClinicalHistory(resident.initial_clinical_history || '');
                                        setShowEditModal(false);
                                    }}
                                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600"
                                >
                                    Cancelar
                                </button>

                                <button
                                    onClick={handleUpdateClinicalHistory}
                                    className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}