import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT = Number(process.env.PORT);

const startServer = async () => {
	try {
		await app.listen({ port: PORT }).then(() => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log("Error starting server:", error);
	}
};

startServer();
