import { ArrowUp, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "../components/Card";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { getTransactionSummary } from "../services/transaction.service";
import type { TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatters";

const initialSummary: TransactionSummary = {
    balance: 0,
    totalExpenses: 0,
    totalIncomes: 0,
    expensesByCategory: [],
}

interface ChartLabelProps {
    categoryName: string;
    percent: number;
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

    const renderPieChatLabel = ({ categoryName, percent }: ChartLabelProps): string => {
        return `${categoryName}: ${(percent * 100).toFixed(1)}%`
    }

    const formatToolTipValue = (value: number | string): string => {
        return formatCurrency(typeof value === "number" ? value : 0)
    }

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
                        {formatCurrency(summary.balance)}
                    </p>
                </Card>
                <Card
                    title="Receitas"
                    icon={<ArrowUp size={20} className="text-primary-500" />}
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-primary-500"
                    >
                        {formatCurrency(summary.totalIncomes)}
                    </p>
                </Card>
                <Card
                    title="Despesas"
                    icon={<Wallet size={20} className="text-red-600" />}
                    hover
                >
                    <p className="text-2xl font-semibold mt-2 text-red-600"
                    >
                        {formatCurrency(summary.totalExpenses)}
                    </p>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
                <Card icon={<TrendingUp size={20} className="text-primary-500" />}
                    title="Despesas Categoria"
                    className="min-h-80"
                    hover
                >
                    {summary.expensesByCategory.length > 0 ? (
                        <div className="h-72 mt-4">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={summary.expensesByCategory}
                                        cx="50%"
                                        cy="50%"
                                        dataKey="amount"
                                        nameKey="categoryName"
                                        label={renderPieChatLabel}
                                    >
                                        {summary.expensesByCategory.map(entry => (
                                            <Cell
                                                key={entry.categoryId}
                                                fill={entry.categotyColor}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={formatToolTipValue} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            Nenhuma despesa nesse periodo
                        </div>
                    )}
                </Card>
            </div>
        </div >
    )
}