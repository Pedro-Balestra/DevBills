import { useEffect } from "react"
import { api } from "../services/api"

export const Dashboard = () => {

    useEffect(() => {
        async function getTransactions() {
            const responde = api.get('/transactions')
            console.log(responde);
        }
        getTransactions();
    },[])

    return (
        <div>
            <h1>Ola</h1>
        </div>
    )
}