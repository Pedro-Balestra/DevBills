import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import {
	type CreateTransactionSchema,
	createTransactionSchema
} from "../../schemas/transaction.schema";

export const createTransaction = async (
	request: FastifyRequest<{ Body: CreateTransactionSchema }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = "64cfc6f50a39c3ff78f3c4e2";
	if (!userId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const result = createTransactionSchema.safeParse(request.body);

	if (!result.success) {
		const errorMessage = result.error.issues?.[0]?.message || "Erro de validação";
		return reply.status(400).send({ error: errorMessage });
	}

	const transaction = result.data;

	try {
		const category = await prisma.category.findFirst({
			where: {
				id: transaction.categoryId,
				type: transaction.type,
			}
		});

		if (!category) {
			return reply.status(400).send({ error: "Categoria invalida" });
		}

		const parsedDate = new Date(transaction.date);

		const newTransaction = await prisma.transaction.create({
			data: {
				...transaction,
				userId,
				date: parsedDate,
			},
			include: {
				category: true,
			},
		});

		reply.status(201).send(newTransaction);

	} catch (error) {
		request.log.error("Erro ao criar transacao", error);
		reply.status(500).send({ error: "Internal Server Errorrrrrrrrr" });
	}
};
