import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LoadingIcon from "../components/LoadingIcon"

export function ProtectedRoute({ requiredLevel}) {
    const { user, loading } = useAuth();

    if (loading) return (
        <>
            <LoadingIcon/>
            <p>Em Loading</p>
            {console.log(user)}
        </>
    )

    if (!user) return <Navigate to="/" replace />

    if (requiredLevel !== undefined && user.access_level !== requiredLevel)
        return <Navigate to="/unauthorized" replace />

    return <Outlet />;
}