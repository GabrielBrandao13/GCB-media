import { useRouter } from 'next/router';
import { useEffect, useState, useContext, FormEvent } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../src/contexts/AuthContext';
import Link from 'next/link';

import { Post } from './api/listPosts'

import { DeleteUserMenu } from '../src/components/DeleteUserMenu';

type UserInfoType = {
    id?: number;
    name?: string;
    exists?: boolean;
}

export default function UserPage() {
    const router = useRouter();

    const { user } = router.query;
    const [userInfo, setUserInfo] = useState<UserInfoType>({})
    const [deletingUser, setDeletingUser] = useState(false);


    let currentUser = useContext(AuthContext).user
    if (currentUser === null) {
        currentUser = {
            id: '0',
            name: ''
        }
    }

    async function getUserData() {
        const res = await fetch('/api/userInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: user
            })
        })

        const data = await res.json()
        if (data.sucess) {
            return setUserInfo({ ...data.user, exists: true })
        }
    }

    const [posts, setPosts] = useState<Post[]>([])

    async function getUserPosts() {
        const res = await fetch('/api/listPosts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: userInfo.id
            })
        })

        const data = await res.json()
        setPosts(data)
    }

    useEffect(() => {
        getUserData()
        getUserPosts()
    }, [])

    return (
        <>
            {deletingUser && (
                <DeleteUserMenu close={() => setDeletingUser(false)} />
            )}
            {userInfo.exists ? (

                <StyledUserPage>
                    <header>
                        {userInfo.name === currentUser.name ? (
                            <>
                                <h1>Bem vindo(a) de volta! {currentUser.name}</h1>
                                <button onClick={() => setDeletingUser(true)}>Deletar conta</button>
                                <button onClick={() => router.push('./createPost')}>Criar postagem</button>
                            </>
                        ) : (
                            <h1>{user}</h1>
                        )}
                    </header>
                    <main>
                        <h1>Bem vindo(a)</h1>

                        {posts.map((post: Post) => (
                            <div>
                                <p>
                                    {post.text}
                                </p>
                            </div>
                        ))}
                        <Link href="/"><a>Home</a></Link>
                    </main>
                </StyledUserPage>

            ) : (
                <StyledErrorPage>
                    <div className="info">

                        <h1>Usuário não encontrado</h1>
                        <p>Houve uma falha ao encontrar o usuário "{user}".</p>
                        <Link href="/"><a>Home</a></Link>
                    </div>
                </StyledErrorPage>
            )}
        </>
    )
}

const StyledUserPage = styled.div`
    background-color: #1029e3;
    height: 100vh;
    color:white;

    header{
        background:black;
        color:white;
        display:flex;
        flex-flow: row nowrap;
        align-items:center;
        justify-content: space-between;
        height: 100px;

        > *{
            margin: 5px;
        }

        button{
            background:white;
            border:none;
            border-radius: 4px;
            font-size: 12pt;
            cursor:pointer;
        }
    }

    main{
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
    }
`

const StyledErrorPage = styled.div`
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content: center;
    background: rgb(248, 248, 248);

    .info{
        width: 100%;
        max-width: 400px;
        height: 400px;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, .3);
        border-radius: 8px;
        display:flex;
        flex-flow: column nowrap;
        align-items: center;
        background:white;

        h1{
            color: rgb(13, 13, 13);
        }
        p{
            color: rgb(43, 43, 43);
            font-size: 13pt;
        }
        a{
            color: blue;
            font-size: 14pt;
        }
    }
`

