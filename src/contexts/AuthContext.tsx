import { ReactNode, createContext, useState } from "react";

type AuthContextProviderPropsType = {
    children: ReactNode;
}

type authContextValueType = {
    id?: number;
    userName?: string;
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
        <AuthContext.Provider value={{ userName: user.name, id: user.id, setUser } as authContextValueType}>
            {children}
        </AuthContext.Provider>

    )
}