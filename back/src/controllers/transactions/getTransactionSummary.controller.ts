import { TransactionType } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionSummarySchema } from "../../schemas/transaction.schema";
import type { CategorySummary } from "../../types/category.types";
import type { TransactionSummary } from './../../types/transaction.type';

dayjs.extend(utc);

export const getTransactionSummary = async (
    request: FastifyRequest<{ Querystring: GetTransactionSummarySchema }>,
    reply: FastifyReply
): Promise<void> => {
    const userId = "64cfc6f50a39c3ff78f3c4e2";
    if (!userId) {
        reply.status(401).send({ error: "Unauthorized" });
    }

    const { month, year } = request.query;
    if (!month || !year) {
        return reply.status(400).send({ error: "Mes e ano são obrigatorios" });
    }
    const startDate = dayjs.utc(`${year}-${month.padStart(2, "0")}-01`)
        .startOf("month")
        .toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId, date: { gte: startDate, lte: endDate, } },
            include: {
                category: true,
            },
        });

        let totalExpenses = 0;
        let totalIncomes = 0;
        const groupedExpenses = new Map<string, CategorySummary>();

        for (const transaction of transactions) {
            if (transaction.type === TransactionType.EXPENSE) {
                const existing = groupedExpenses.get(transaction.categoryId) ?? {
                    categoryId: transaction.categoryId,
                    categoryName: transaction.category.name,
                    categotyColor: transaction.category.color,
                    amount: 0,
                    percentage: 0,
                };

                existing.amount += transaction.amount;
                groupedExpenses.set(transaction.categoryId, existing);

                totalExpenses += transaction.amount;
            } else {
                totalIncomes += transaction.amount;
            }
        }

        const summary: TransactionSummary = {
            totalExpenses,
            totalIncomes,
            balance: Number((totalIncomes - totalExpenses).toFixed(2)),
            expensesByCategory: Array.from(groupedExpenses.values()).map((entry) => (
                {
                    ...entry,
                    percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
                }
            )).sort((a, b) => b.amount - a.amount),

        }

        reply.send(summary);
    } catch (error) {
        request.log.error("Erro ao trazer transacoes", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
}
