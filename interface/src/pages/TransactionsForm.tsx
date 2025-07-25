import { useEffect, useId, useState } from "react";
import { Card } from "../components/Card";
import { TransactionTypeSelector } from "../components/TransactionTypeSelector";
import { getCategories } from "../services/category.service";
import type { Category } from "../types/category";
import { TransactionType } from "../types/transactions";

interface FormData {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: TransactionType
}

const initialFormData = {
    description: "",
    amount: 0,
    date: "",
    categoryId: "",
    type: TransactionType.EXPENSE,
}

export const TransactionsForm = () => {

    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const formId = useId()
    const handleSubmit = () => { }

    const handleTransactionType = (itemType: TransactionType): void => {
        setFormData((prev) => ({ ...prev, type: itemType }))
    }

    useEffect(() => {
        const fetchCategories = async (): Promise<void> => {
            const response = await getCategories()
        }
        fetchCategories()
    }, [])

    return (
        <div>
            <div>
                <h1>Nova Transação</h1>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor={formId}>Tipo de Despesa</label>
                            <TransactionTypeSelector
                                id={formId}
                                value={formData.type}
                                onChange={handleTransactionType}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}