import { Link } from 'react-router-dom'
import medico from '../assets/medico.svg'
import { ChevronRight } from 'lucide-react';

export default function Card(props) {
    return (
        <Link to={`/admin/profile/${props.public_id}`} className='no-underline mb-2 w-full flex'>
            <div className='flex w-full items-center md:justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer p-4 transition-all shadow-sm'>
                
                <img src={medico} alt="ícone de médico" className='w-12 h-12 md:h-8 md:w-8 mr-4 flex-shrink-0 self-start md:self-center'/>
                
                <div className='flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 w-full mr-2 overflow-hidden'>
                    <p className='text-base md:text-sm font-bold text-slate-800 truncate' title={props.name}>
                        {props.name}
                    </p>
                    <p className='text-sm text-slate-500 truncate' title={props.login}>
                        <span className='md:hidden font-medium text-slate-400'>Longin: </span>
                        {props.login}
                    </p>
                    <p className='text-sm text-slate-500 truncate' title={props.email}>
                        <span className='md:hidden font-medium text-slate-400'>E-mail: </span>
                        {props.email}
                    </p>
                </div>

                <span className='flex-shrink-0 ml-auto'>
                    <ChevronRight size={20} className="text-slate-400" />
                </span>
            </div>
        </Link>
    )
}


