import { useEffect, useState } from "react";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { getTransactions } from "../services/transaction.service";

export const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);

    useEffect(() => {
        async function getTransactionsUser() {
            const responde = await getTransactions({ categoryId: "68795ff463b3be58955ba871" });
            console.log(responde);
        }
        getTransactionsUser();
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