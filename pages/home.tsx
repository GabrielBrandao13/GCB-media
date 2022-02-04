import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserInfo, useUser } from '../src/hooks/useUser'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../src/contexts/AuthContext'

type HomeProps = {
    className?: string;
}

function Home({ className }: HomeProps) {
    const router = useRouter()
    const userInfo = useContext(AuthContext).user
    const [user, setUser] = useState<UserInfo>()

    useEffect(() => {
        if (userInfo === null) {
            router.push('/login')
        }
        useUser(userInfo?.name).then(res => setUser(res))
    }, [])

    return (
        <>
            <Head>
                <title>Home - {user?.userName}</title>
            </Head>

            <main className={className}>
                <a><Link href="/createPost">Adicionar postagem</Link></a>
                <button>Deletar usuário</button>
            </main>
        </>
    )
}

const StyledHome = styled(Home)`
    background-color: #1029e3;
    min-height: 90vh;
    color:white;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;

    a {
        text-decoration:none;
        color: white;
    }
`

export default StyledHome