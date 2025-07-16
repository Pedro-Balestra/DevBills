import { app } from "./app";

const PORT = 3001;

const startServer = async () => {
    try {
        await app.listen({ port: PORT }).then(() => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Error starting server:', error);
    }
}

startServer();