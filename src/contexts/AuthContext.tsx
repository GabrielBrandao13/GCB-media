import { ReactNode, createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

type AuthContextProviderPropsType = {
    children: ReactNode;
}

type authContextValueType = {
    user: User;
    signIn: (userName: String, password: String) => void;
    logout: () => void;
}

export type User = {
    name: string;
    id: string;
}

export const AuthContext = createContext({} as authContextValueType)

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const { 'nextauth.username': userName, 'nextauth.userid': userId } = parseCookies()
        if (!!userName && !!userId) {
            setUser({
                id: userId,
                name: userName
            })
        }
    }, [])

    async function signIn(userName: String, password: String) {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userName,
                pass: password
            }),
        })

        const data = await res.json()
        const { user, token } = data

        setCookie(undefined, 'nextauth.username', user.name, {
            maxAge: 60 * 60 * 1,
        })
        setCookie(undefined, 'nextauth.userid', user.id, {
            maxAge: 60 * 60 * 1,
        })

        setUser(user)
        Router.push(`/home`)

    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logout } as authContextValueType}>
            {children}
        </AuthContext.Provider>

    )
}