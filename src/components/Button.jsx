export default function Button(props) {
    return (
        <button 
            className="bg-blue-400 text-left text-white p-2 rounded-md flex"
            {...props}
        >
            {props.children}
        </button>
    )
}