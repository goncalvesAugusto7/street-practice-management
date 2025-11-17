export default function Button(props) {
    return (
        <button 
            className="bg-slate-400 text-left text-white p-2 rounded-md"
            {...props}
        >
            {props.children}
        </button>
    )
}