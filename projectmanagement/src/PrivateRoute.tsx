import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./stores/authStore"


export const PrivateRoute: React.FC = () => {
    const { user } = useAuthStore();

    const isLoggedIn = !!user;

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}