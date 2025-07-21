import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h2>Página não encontrada</h2>} />
            </Routes>
        </BrowserRouter>
    )
}