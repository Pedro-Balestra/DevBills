import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../hooks/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<h2>Página não encontrada</h2>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}