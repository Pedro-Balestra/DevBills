import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { getTransactionSummary } from "../services/transaction.service";
import type { TransactionSummary } from "../types/transactions";

const initialSummary: TransactionSummary = {
    balance: 0,
    totalExpenses: 0,
    totalIncomes: 0,
    expensesByCategory: [],
}

export const Dashboard = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [summary, setSummary] = useState<TransactionSummary>(initialSummary);

    useEffect(() => {
        async function loadTransactionsSummary() {
            const responde = await getTransactionSummary(month, year);
            setSummary(responde);
        }
        loadTransactionsSummary();
    }, [month, year])

    return (
        <div className="container-app py-6">
            <div className="flex felx-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Ola</h1>
                <MonthyearSelect month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
            </div>
            <Card
                glowEffect
                hover
                title="Despesas"
                subtitle="Alguma coisa"
                icon={<ArrowUp className="text-primary-500" />}
            >
                <div>
                    <p className="font-bold text-primary-500">R$2000,00</p>
                </div>
            </Card>
        </div>
    )
}