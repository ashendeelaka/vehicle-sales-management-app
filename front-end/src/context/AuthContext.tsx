import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
    token?: string;
    setToken?: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
    const [token, setToken] = useState<string>();
    useEffect(() => {
        const authToken = localStorage.getItem("token");
        setToken(authToken!);
    }, [])

    return (
        <AuthContext.Provider value={{
            token,
            setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);