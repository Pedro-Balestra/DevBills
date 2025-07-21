import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionSummarySchema } from "../../schemas/transaction.schema";

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
        reply.send(transactions);
    } catch (error) {
        request.log.error("Erro ao trazer transacoes", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
}
