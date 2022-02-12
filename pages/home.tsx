import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserInfo, useUser } from '../src/hooks/useUser'
import { useEffect, useState } from 'react'

import { UserPost } from '../src/components/UserPost';
import { PostsWrapper } from '../src/components/PostsWrapper'
import { useAuth } from '../src/hooks/useAuth'

type HomeProps = {
    className?: string;
}

function Home({ className }: HomeProps) {
    const router = useRouter()
    const userInfo = useAuth().user
    const [user, setUser] = useState<UserInfo | null>(null)

    useEffect(() => {
        if (userInfo === null) {
            router.push('/login')
        }
        useUser(`${userInfo.name}`).then(res => setUser(res))
    }, [])

    return (
        <>
            <Head>
                <title>Home - {userInfo.name}</title>
            </Head>

            <main className={className}>
                <h2>Suas postagens</h2>
                <PostsWrapper>
                    {user?.posts.map(post => <UserPost date={post.datePost} imageUrl={post.imageUrl} text={post.text} key={post.postId} />)}
                </PostsWrapper>
                <a className="add-post"><Link href="/createPost">Adicionar postagem</Link></a>
            </main>
        </>
    )
}

const StyledHome = styled(Home)`
    background-color: #1029e3;
    color:white;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;
    
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