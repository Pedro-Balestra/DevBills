import { FastifyInstance } from "fastify";
import { createTransaction } from "../controllers/transactions/createTransaction.controller";

export const transactionRoutes = async (fastify: FastifyInstance) =>{
    fastify.route({
        method: 'POST',
        url: '/',
        schema:{

        },
        handler: createTransaction,
    })
}