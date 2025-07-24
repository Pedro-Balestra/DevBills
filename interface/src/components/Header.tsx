import { Link } from "react-router"

export const Header = () => {
    return (
        <div>
            <h1>Header</h1>
            <Link to="/transacoes">Transações</Link>
        </div>
    )
}