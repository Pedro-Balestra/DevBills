import { ArrowUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { getTransactionSummary } from "../services/transaction.service";
import type { TransactionSummary } from "../types/transactions";
import { fomartCurrency } from "../utils/formatters";

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    title="Saldo"
                    icon={<Wallet size={20} className="text-primary-500" />}
                    hover
                    glowEffect={summary.balance > 0}
                >
                    <p className={`text-2xl font-semibold mt-2
                    ${summary.balance > 0 ? "text-primary-500" : "text-red-300"}`}
                    >
                        {fomartCurrency(summary.balance)}
                    </p>
                </Card>
                <Card
                    title="Receitas"
                    icon={<ArrowUp size={20} className="text-primary-500" />}
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-primary-500"
                    >
                        {fomartCurrency(summary.totalIncomes)}
                    </p>
                </Card>
                <Card
                    title="Despesas"
                    icon={<Wallet size={20} className="text-red-600" />}
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-red-600"
                    >
                        {fomartCurrency(summary.totalExpenses)}
                    </p>
                </Card>
            </div>
        </div >
    )
}