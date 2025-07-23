import admin from "firebase-admin";
import { env } from "./env";

export const initializeFirebaseAdmin = (): void => {
    if (admin.apps.length > 0) return;

    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = env

    if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
        throw new Error("Falha ao iniciar Firebase - Faltando as credencias");
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY,
            }),
        });
    } catch (error) {
        console.error("Falha ao conectar no Firebase", error)
        process.exit(1)
    }
}