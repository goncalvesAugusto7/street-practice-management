export default function DashboardHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                Dashboard de Atendimentos
            </h1>

            <span className="text-white/80 text-sm">
                Atualizado em tempo real
            </span>
        </div>
    )
}