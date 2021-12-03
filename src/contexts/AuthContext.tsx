import { ReactNode, createContext, useState } from "react";

type AuthContextProviderPropsType = {
    children: ReactNode;
}

type authContextValueType = {
    user: UserType;
    setUser: (user: UserType) => void;
}

type UserType = {
    name?: string;
    id?: number;
}

export const AuthContext = createContext({} as authContextValueType)

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
    const [user, setUser] = useState<UserType>({})

    return (
        <AuthContext.Provider value={{ user, setUser } as authContextValueType}>
            {children}
        </AuthContext.Provider>

    )
}