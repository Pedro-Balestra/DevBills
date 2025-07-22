import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authState = {
        user: { nome: "Test", email: "test@outlook.com" },
        error: null,
        loading: false,
    }
    return (
        <AuthContext.Provider value={authState}>
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