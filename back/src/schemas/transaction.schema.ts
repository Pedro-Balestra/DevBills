import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";

const isValidObectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
    description: z.string().min(1,"Descrição é obrigatória"),
    amount: z.number().postive('Valor deve ser positivo'),
    date: z.coerce.date({
        errorMap: () => ({ message: "Data inválida" }),
    }),
    categoryId: z.string().refine(isValidObectId, {
        message: "ID de categoria inválido",
    }),
    type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME], {
        errorMap: () => ({ message: "Tipo inválida" }),
    })
})
