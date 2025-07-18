import type { FastifyInstance } from "fastify";
import { categoryRoutes } from "./category.routes";
import { transactionRoutes } from "./transaction.routes";
export async function routes(fastify: FastifyInstance): Promise<void> {
	fastify.get("/health", async () => {
		return {
			status: "ok",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			memoryUsage: process.memoryUsage(),
			nodeVersion: process.version,
			platform: process.platform,
		};
	});
	fastify.register(categoryRoutes, { prefix: "/categories" });
	fastify.register(transactionRoutes, { prefix: "/transactions" });
}
