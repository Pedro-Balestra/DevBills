import type { FastifyReply, FastifyRequest } from "fastify";

export const createTransaction = async (
	_request: FastifyRequest,
	reply: FastifyReply,
): Promise<void> => {
	const userId = "FDGF!DH@f3";
	if (!userId) {
		reply.status(401).send({ error: "Unauthorized" });
	}
};
