import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionSchema } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.type";

dayjs.extend(utc);

export const getTransactions = async (
	request: FastifyRequest<{ Querystring: GetTransactionSchema }>,
	reply: FastifyReply,
): Promise<void> => {
	const userId = request.userId;
	if (!userId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	const { month, categoryId, type, year } = request.query;

	const filters: TransactionFilter = { userId };

	if (month && year) {
		const startDate = dayjs.utc(`${year}-${month.padStart(2, "0")}-01`)
			.startOf("month")
			.toDate();
		const endDate = dayjs.utc(startDate).endOf("month").toDate();
		filters.date = { gte: startDate, lte: endDate };
	}

	if (categoryId) {
		filters.categoryId = categoryId;
	}
	if (type) {
		filters.type = type;
	}

	try {
		const transactions = await prisma.transaction.findMany({
			where: filters,
			orderBy: { date: "desc" },
			include: {
				category: {
					select: {
						color: true,
						name: true,
						type: true,
					},
				},
			},
		});
		reply.send(transactions);
	} catch (error) {
		request.log.error("Erro ao trazer transacoes", error);
		reply.status(500).send({ error: "Internal Server Error" });
	}
};
