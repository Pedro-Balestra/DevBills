import dotenv from "dotenv";
import { app } from "./app";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
	try {
		await prismaConnect();

        await initializeGlobalCategories();
		await app.listen({ port: PORT }).then(() => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log("Error starting server:", error);
	}
};

startServer();
