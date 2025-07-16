import { FastifyInstance } from 'fastify';
export async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.get('/health', async (request, reply) => {
        return { message: 'Welcome to the Fastify server!', status: 'healthy' };
    });
}