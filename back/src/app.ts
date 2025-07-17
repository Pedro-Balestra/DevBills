import Fastify, { type FastifyInstance } from "fastify";
import { routes } from "./routes";

export const app: FastifyInstance = Fastify({
	logger: true,
});

app.register(routes,{prefix: "/api"});
