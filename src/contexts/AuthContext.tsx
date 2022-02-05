import { ReactNode, createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

import { LoginApiResponse } from '../../pages/api/login';

type AuthContextProviderPropsType = {
    children: ReactNode;
}

type authContextValueType = {
    user: User;
    signIn: (userName: String, password: String) => Promise<signInReturn>;
    logout: () => void;
    deleteUser: (userName: string, password: string) => void;
}

export type User = {
    name: string;
    id: string;
} | null

type signInReturn = {
    sucess: boolean;
    status: string;
}

export const AuthContext = createContext({} as authContextValueType)

export function AuthContextProvider({ children }: AuthContextProviderPropsType) {
    const [user, setUser] = useState<User>(null)

    useEffect(() => {
        const { 'nextauth.username': userName, 'nextauth.userid': userId } = parseCookies()
        if (!!userName && !!userId) {
            setUser({
                id: userId,
                name: userName
            })
        }
    }, [])

    async function signIn(userName: String, password: String): Promise<signInReturn> {
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

        const data = await res.json() as LoginApiResponse
        const { user, sucess, status } = data

        setCookie(undefined, 'nextauth.username', `${user?.name}`, {
            maxAge: 60 * 60 * 1,
        })
        setCookie(undefined, 'nextauth.userid', `${user?.id}`, {
            maxAge: 60 * 60 * 1,
        })

        if (sucess) {
            setUser({
                id: `${user?.id}`,
                name: `${user?.name}`
            })
        }


        return {
            sucess,
            status
        }
    }

    function logout() {
        setUser(null)
        Router.push('/')
    }

    async function deleteUser(userName: string, password: string) {
        await fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                password
            })
        })

        logout()

        close()
        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logout, deleteUser } as authContextValueType}>
            {children}
        </AuthContext.Provider>

    )
}