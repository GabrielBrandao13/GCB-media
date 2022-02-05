import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserInfo, useUser } from '../src/hooks/useUser'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../src/contexts/AuthContext'

import { UserPost } from '../src/components/UserPost';

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
        useUser(`${userInfo?.name}`).then(res => setUser(res))
    }, [])

    return (
        <>
            <Head>
                <title>Home - {user?.userName}</title>
            </Head>

            <main className={className}>
                <h2>Suas postagens</h2>
                <div className="posts">
                    {user?.posts.map(post => <UserPost date={post.datePost} imageUrl={post.imageUrl} text={post.text} key={post.postId} />)}
                </div>
                <a className="add-post"><Link href="/createPost">Adicionar postagem</Link></a>
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
    
    .posts {
        overflow-y: auto;
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        height: 400px;

        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background-color: #162bcf;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #354dff;
            border-radius: 2px;
        }
    }
    
    a {
        text-decoration:none;
        color: white;
    }

    .add-post{
        border: 1px solid white;
        border-radius: 4px;
        padding: 3px;
        font-size: 12pt;
        margin: 5px;
    }
`

export default StyledHome