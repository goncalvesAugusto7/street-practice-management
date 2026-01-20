import { Link } from 'react-router-dom'
import { ChevronRight, User, UserRound } from 'lucide-react';
import { MdOutlineMan, MdOutlineWoman } from "react-icons/md";

export default function ResidentCard(props) {

    return (
        <Link to={`/resident/${props.public_id}`} className='no-underline mb-2 w-full flex'>
            <div className='flex w-full items-center md:justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer p-4 transition-all shadow-sm'>
               
                {props.sex == "M"
                ? <MdOutlineMan size={64} color="#2563eb" strokeWidth={0} className='pr-4'/>
                : <MdOutlineWoman size={64} color="#db2777" strokeWidth={0} className='pr-4'/>}
        
                
                <div className='flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-4 w-full mr-2 overflow-hidden'>
                    <p className='text-base md:text-sm font-bold text-slate-800 truncate' title={props.name}>
                        {props.name}
                    </p>
                    <p className='text-sm text-slate-500 truncate' title={props.login}>
                        <span className='md:hidden font-medium text-slate-400'>Nascimento: </span>
                        {props.date_of_birth}
                    </p>
                    <p className='text-sm text-slate-500 truncate' title={props.email}>
                        <span className='md:hidden font-medium text-slate-400'>Sexo: </span>
                        {props.sex}
                    </p>
                </div>

                <span className='flex-shrink-0 ml-auto'>
                    <ChevronRight size={20} className="text-slate-400" />
                </span>
            </div>
        </Link>
    )
}