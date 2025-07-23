import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-6">
                <Outlet />
            </main>
            <Footer />
        </div>)
}