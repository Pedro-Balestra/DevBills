import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
	description: z.string().min(1, "Descrição é obrigatória"),
	amount: z.number().positive("Valor deve ser positivo"),
	date: z.coerce.date({
		error: () => ({ message: "Data inválida" }),
	}),
	categoryId: z.string().refine(isValidObectId, {
		message: "ID de categoria inválido",
	}),
	type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME], {
		error: () => ({ message: "Tipo inválida" }),
	}),
});

export const getTransactionsSchema = z.object({
	month: z.string().optional(),
	year: z.string().optional(),
	type: z
		.enum([TransactionType.EXPENSE, TransactionType.INCOME], {
			error: () => ({ message: "Tipo inválida" }),
		})
		.optional(),
	categoryId: z
		.string()
		.refine(isValidObectId, {
			message: "ID de categoria inválido",
		})
		.optional(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type GetTransactionSchema = z.infer<typeof getTransactionsSchema>;
