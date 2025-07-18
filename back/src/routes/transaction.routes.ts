import type { FastifyInstance } from 'fastify';
import zodToJsonSchema from 'zod-to-json-schema';
import { createTransaction } from '../controllers/transactions/createTransaction.controller';
import { getTransactions } from '../controllers/transactions/getTransaction.controller';
import { createTransactionSchema, getTransactionsSchema } from './../schemas/transaction.schema';

export const transactionRoutes = async (fastify: FastifyInstance): Promise<void> => {
	// Define the route for creating a transaction
	fastify.route({
		method: 'POST',
		url: '/',
		schema: {
			body: zodToJsonSchema(createTransactionSchema),
		},
		handler: createTransaction,
	});
	// Define the route for getting transaction by date
	fastify.route({
		method: 'GET',
		url: '/',
		schema: {
			querystring: zodToJsonSchema(getTransactionsSchema),
		},
		handler: getTransactions,
	});
};