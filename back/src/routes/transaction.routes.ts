// src/routes/transaction.routes.ts
import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createTransaction } from '../controllers/transactions/createTransaction.controller';
import { deleteTransaction } from '../controllers/transactions/deleteTransaction.controller';
import { getTransactions } from '../controllers/transactions/getTransaction.controller';
import { getTransactionSummary } from '../controllers/transactions/getTransactionSummary.controller';
import { authMiddleware } from '../middleware/auth.middleware';

// 🔧 TROCAR FastifyInstance por FastifyInstance com o Zod provider
export const transactionRoutes: FastifyPluginAsync = async (fastify) => {

	fastify.addHook('preHandler', authMiddleware);

	const app = fastify.withTypeProvider<ZodTypeProvider>();

	app.post(
		'/',
		createTransaction
	);

	app.get(
		'/',
		getTransactions
	);

	app.get(
		'/summary',
		getTransactionSummary
	);

	app.delete(
		'/:id',
		deleteTransaction
	);
};

