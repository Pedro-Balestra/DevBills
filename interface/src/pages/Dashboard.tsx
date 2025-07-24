import { ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../components/Card";
import { MonthyearSelect } from "../components/MonthyearSelect";
import { getTransactionMonthly, getTransactionSummary } from "../services/transaction.service";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
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
    const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

    useEffect(() => {
        async function loadTransactionsSummary() {
            const responde = await getTransactionSummary(month, year);
            setSummary(responde);
        }
        loadTransactionsSummary();
    }, [month, year])

    useEffect(() => {
        async function loadTransactionsMonthly() {
            const response = await getTransactionMonthly(month, year, 4);
            setMonthlyItemsData(response.history);
            console.log(response.history)
        }
        loadTransactionsMonthly();
    }, [month, year])

    const renderPieChatLabel = ({ categoryName, percent }: ChartLabelProps): string => {
        return `${categoryName}: ${(percent * 100).toFixed(1)}%`
    }

    const formatToolTipValue = (value: number | string): string => {
        return formatCurrency(typeof value === "number" ? value : 0)
    }
    console.table(monthlyItemsData)
    const chartData = monthlyItemsData.map((item) => ({
        ...item,
        name: item.name.split("/")[0], // pega só o mês: "mar", "abr", ...
    }));


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
                    className="hover:border-red-600 hover:shadow-lg hover:-translate-y-0.5"
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
                <Card icon={<Calendar size={20} className="text-primary-500" />}
                    title="Histórico Mensal"
                    className="min-h-80 p-2.5"
                    hover
                >
                    <div className="mt-4 h-72">
                        {monthlyItemsData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ left: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#94A3B8"
                                        tick={{ style: { textTransform: "capitalize" } }}
                                    />
                                    <YAxis
                                        stroke="#94A3B8"
                                        tickFormatter={formatCurrency}
                                        tick={{ style: { fontSize: 14 } }}
                                    />
                                    <Tooltip formatter={formatCurrency}
                                        contentStyle={{
                                            backgroundColor: "#1a1a1a",
                                            borderColor: "#2a2a2a"
                                        }}
                                        labelStyle={{ color: "#f8f8f8" }}
                                        cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="expense" name="Despesas" fill="#FF6384" />
                                    <Bar dataKey="income" name="Receitas" fill="#37E359" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                Nenhuma despesa nesse periodo
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div >
    )
}