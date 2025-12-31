export default function Title(props) {
    return (
        <h1
            className="text-5xl text-slate-100 font-bold text-center"
        >
            {props.children}
        </h1>
    )
}