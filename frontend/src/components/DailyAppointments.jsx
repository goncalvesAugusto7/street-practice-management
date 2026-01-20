import { Clock, User, Stethoscope } from 'lucide-react'
import Loading from './LoadingIcon';
import { useEffect } from 'react';

const mockAppointments = [
    {
        id: 1,
        time: '19:01',
        resident: 'Peter Parker',
        service: 'Vacinação',
        agent: 'Agente'
    },
    {
        id: 2,
        time: '15:20',
        resident: 'Maria Silva',
        service: 'Consulta',
        agent: 'Enfermeira Ana'
    }
]

export default function DailyAppointments(props) {
    const today = new Date();

    const services = props.services || [{data:""},{data:""}];
    
    var todayServices = [];
    if (services.length > 0) {
        todayServices = services.filter((service) => {
            const matchData = 
                service.created_at.split(" ")[1] == today.toLocaleDateString('pt-BR')

            return matchData
        })
    }


    return (
        <div className='bg-white rounded-2xl shadow-md p-6 lg:col-span-1 pt-6'>
            {console.log(services.length)}
            <h2 className='text-lg font-bold text-slate-800 mb-4'>
                Atendimentos de Hoje<br></br>{today.toLocaleDateString('pt-BR')}
            </h2>

            <div className='space-y-4'>
                {Array.isArray(todayServices) && todayServices.map(item => (
                    <div
                        key={item.public_id}
                        className='border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition'
                    >
                        <div className='flex items-center justify-between mb-2'>
                            <span className='text-sm font-semibold text-blue-600'>
                                {item.type_service.description}
                            </span>
                            <div className='flex items-center gap-1 text-slate-500 text-sm'>
                                <Clock/>
                                {item.date.split(" ")[0]}
                            </div>
                        </div>

                        <p className='flex items-center gap-1 text-slate-700 text-sm'>
                            <User size={14} /> {item.resident.name}
                        </p>

                        <p className="flex items-center gap-1 text-slate-500 text-sm">
                            <Stethoscope size={14} /> {item.health_worker.name}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}
