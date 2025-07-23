import { useEffect, useState } from "react";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { api } from "../services/api";

export const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);

    useEffect(() => {
        async function getTransactions() {
            const responde = api.get('/transactions')
            console.log(responde);
        }
        getTransactions();
    }, [])

    return (
        <div className="container-app py-6">
            <div className="flex felx-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Ola</h1>
                <MonthyearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            </div>
        </div>
    )
}