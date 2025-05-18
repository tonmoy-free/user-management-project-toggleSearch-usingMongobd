import React from 'react';
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const c = 1;

    const authData={
        c
    }
    return (
        <AuthContext value={c}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;