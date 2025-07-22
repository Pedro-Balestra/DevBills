import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../hooks/AuthContext";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h2>Página não encontrada</h2>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}