import { FastifyReply, FastifyRequest } from "fastify";
import admin from 'firebase-admin';

declare module "fastify" {
    interface FastifyRequest {
        userId?: string;
    }
}

export const authMiddleware = async (
    request: FastifyRequest, reply: FastifyReply
): Promise<void> => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.code(401).send({ error: "Token de autorização não fornecido" })
    }

    const token = authHeader.replace("Bearer", "")

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        request.userId = decodedToken.uid

    } catch (error) {
        request.log.error("Erro ao verificar token", error)
        reply.code(401).send({ error: "Token invalido ou expirado" })
    }
}