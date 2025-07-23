import { signOut as firebaseSignOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
    authState: AuthState,
    singWithGoogle: () => Promise<void>;
    singOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        error: null,
        loading: false,
    });

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setAuthState({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    error: null,
                    loading: false,
                });
            } else {
                setAuthState({
                    user: null,
                    error: null,
                    loading: false,
                })
            }
        }, (error) => {
            console.error("Erro na autenticação");
            setAuthState({ user: null, error: error.message, loading: false });
        });
        return () => unSubscribe();
    }, [])

    const singWithGoogle = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }));
        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao tentar logar"
            setAuthState((prev) => ({ ...prev, loading: false, error: message }))
        }
    }

    const singOut = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }));
        try {
            await firebaseSignOut(firebaseAuth)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao tentar logar";
            setAuthState((prev) => ({ ...prev, loading: false, error: message }))
        }
    }

    return (
        <AuthContext.Provider value={{ authState, singWithGoogle, singOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }

    return context;
}