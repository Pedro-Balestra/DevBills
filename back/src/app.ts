import Fastify, { type FastifyInstance } from "fastify";
import { env } from "./config/env";
import { routes } from "./routes";

export const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
  },
});

app.register(routes, { prefix: "/api" });
