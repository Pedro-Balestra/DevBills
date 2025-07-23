import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/AuthContext";

export const PrivateRoutes = () => {
    const { authState } = useAuth();

    if (!authState.user) {
        return <Navigate to="login" replace />
    }

    return <Outlet />
}