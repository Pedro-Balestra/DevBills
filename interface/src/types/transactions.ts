
import type { Category, CategorySummary } from './category';

export enum TransactionType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
}


export interface Transaction {
    id: string;
    userId: string;
    description: string;
    amount: number;
    date: string | Date;
    categoryId: string;
    category: Category;
    type: TransactionType;
    updatedAt: string | Date;
    createdAt: string | Date;
}

export interface TransactionFilter {
    month: number;
    year: number;
    categoryId?: string;
    type?: TransactionType;
}

export interface TransactionSummary {
    totalExpenses: number;
    totalIncomes: number;
    balance: number;
    expensesByCategory: CategorySummary[];
}

export interface MonthlyItem {
    name: string;
    expense: number;
    income: number;
}