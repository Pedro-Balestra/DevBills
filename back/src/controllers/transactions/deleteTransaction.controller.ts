import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { DeleteTransactionSchema } from "../../schemas/transaction.schema";

export const deleteTransaction = async (
    request: FastifyRequest<{ Params: DeleteTransactionSchema }>,
    reply: FastifyReply,
): Promise<void> => {
    const userId = request.userId;
    const { id } = request.params;
    if (!userId) {
        reply.status(401).send({ error: "Unauthorized" });
    }

    try {
        const transaction = await prisma.transaction.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!transaction) {
            return reply.status(404).send({ error: "ID da transação inválido" });
        }

        await prisma.transaction.delete({
            where: { id },
        })
        reply.status(200).send({ message: "Transação deletada com sucesso" });
    } catch (error) {
        request.log.error("Erro ao deletar transação", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
};
