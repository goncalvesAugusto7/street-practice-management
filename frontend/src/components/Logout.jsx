import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Erro ao fazer logout", err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          Deseja mesmo sair?
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Essa ação não poderá ser desfeita.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate(0)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-60"
          >
            {loading ? "Saindo..." : "Sair"}
          </button>
        </div>
      </div>
    </div>
  );
}
