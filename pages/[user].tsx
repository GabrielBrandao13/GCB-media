import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../src/contexts/AuthContext';
import Link from 'next/link';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next'

import { Post } from './api/listPosts'

import { DeleteUserMenu } from '../src/components/DeleteUserMenu';
import { ParsedUrlQuery } from 'querystring'

type UserPageProps = {
    userData: GetStaticPropsFinalData;
}

export default function UserPage({ userData }: UserPageProps) {
    const router = useRouter();

    const { user } = router.query;
    const [deletingUser, setDeletingUser] = useState(false);

    let currentUser = useContext(AuthContext).user
    if (currentUser === null) {
        currentUser = {
            id: '0',
            name: ''
        }
    }

    return (
        <>
            {deletingUser && (
                <DeleteUserMenu close={() => setDeletingUser(false)} />
            )}
            <StyledUserPage>
                <main>
                    <h1>{userData.userName}</h1>

                    {userData.posts.map((post: Post) => (
                        <div>
                            <p>
                                {post.text}
                            </p>
                        </div>
                    ))}

                    <Link href="/"><a>Home</a></Link>
                </main>
            </StyledUserPage>
        </>
    )
}

interface GetStaticPropsParams extends ParsedUrlQuery {
    user: string
}

type GetStaticPropsFinalData = {
    userName: string;
    id: number | null;
    posts: Post[];
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { user } = context.params as GetStaticPropsParams

    var finalData: GetStaticPropsFinalData = {
        userName: user,
        id: null,
        posts: []
    }

    const res = await fetch('http://localhost:3000/api/userInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: user
        })
    })

    const userData = await res.json()
    if (userData.sucess) {
        finalData.id = userData.user.id
    } else {
        return {
            notFound: true
        }
    }

    const resPosts = await fetch('http://localhost:3000/api/listPosts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            userId: finalData.id
        })
    })

    const userPosts = await resPosts.json()

    finalData.posts = userPosts

    return {
        props: {
            userData: finalData
        },
        revalidate: 60
    }
}

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
    return {
        paths: [],
        fallback: true
    }
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
            font-size: 14pt;
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

