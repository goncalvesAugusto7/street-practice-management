import { map } from 'leaflet';
import { Syringe, Users, Activity } from 'lucide-react'


export default function HealthIndicators(props) {
    const services = props.services || [];
    const today = new Date()
    
    var todayServices = [];
    

    if (services.length > 0) {
        todayServices = services.filter((service) => {
            const matchData = 
                service.created_at.split(" ")[1] == today.toLocaleDateString('pt-BR')

            return matchData
        })
    }

    const totalServicesNumber = services.length || 0;
    
    const indicators = [
        {label: 'Atendimentos Hoje', value: todayServices.length, icon: Activity},
        {label: 'Antendimentos Totais', value: totalServicesNumber, icon: Activity},
        // {label: 'Moradores Atendidos', value: 10, icon: Users},
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 pb-6">
            {indicators.map(({ label, value, icon: Icon}) => (
                <div
                    key={label}
                    className='bg-white rounded-2xl shadow-md p-6 flex items-center gap-4'
                >
                    <div className='p-3 bg-blue-100 rounded-xl'>
                        <Icon className='text-blue-600'/>
                    </div>

                    <div>
                        <p className='text-sm text-slate-500'>{label}</p>
                        <p className='text-2xl font-bold text-slate-800'>
                            {value}
                        </p>
                    </div>

                </div>
            ))}

        </div>
    )
}