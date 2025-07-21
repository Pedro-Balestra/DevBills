import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import Fastify, { type FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { env } from "./config/env";
import { routes } from "./routes";

// Crie a instância do Fastify
const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>(); // ✅ Conecta o Zod aqui!

// --- REGISTRO DE PLUGINS ESSENCIAIS ---

// Habilita o CORS para toda a aplicação
app.register(cors, {
  origin: "*", // Em produção, restrinja para o seu domínio do front-end
});

// Habilita o parser de JSON e melhora o tratamento de erros
app.register(sensible);

// --- REGISTRO DAS ROTAS ---

// Registra todas as suas rotas com um prefixo global
app.register(routes, { prefix: "/api" });

// Exporta a instância configurada
export default app;
