import { app } from "./app";
import { env } from "./config/env";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const PORT = env.PORT;

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
