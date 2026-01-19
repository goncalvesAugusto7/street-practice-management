import pare_emoji_policia from "../assets/pare_emoji_policia.png";


export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center text-center">
            <p className="mb-2 text-lg font-semibold">
                Acesso não autorizado
            </p>

            <img
                src={pare_emoji_policia}
                alt="ícone de polícia"
                className="w-48 h-48"
            />
        </div>

    )
}
