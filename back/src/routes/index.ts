import type { FastifyPluginAsync } from 'fastify';
import { categoryRoutes } from './category.routes';
import { transactionRoutes } from './transaction.routes';

export const routes: FastifyPluginAsync = async (fastify) => {
	fastify.get('/health', async () => {
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			memoryUsage: process.memoryUsage(),
			nodeVersion: process.version,
			platform: process.platform,
		};
	});

	fastify.register(categoryRoutes, { prefix: '/categories' });
	fastify.register(transactionRoutes, { prefix: '/transactions' });
};
