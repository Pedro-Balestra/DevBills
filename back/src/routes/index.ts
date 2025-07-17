import type { FastifyInstance } from "fastify";
import { categoryRoutes } from "./category.routes";
export async function routes(fastify: FastifyInstance): Promise<void> {
	fastify.get("/health", async (_request, _replyy) => {
		return { message: "Welcome to the Fastify server!", status: "healthy" };
	});
	fastify.register(categoryRoutes, { prefix: "/categories" });
}
