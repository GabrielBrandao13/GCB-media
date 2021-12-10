import styled from 'styled-components';
import Head from 'next/head'
import { useState } from 'react';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next'

import { Post } from '../api/listPosts'

import { DeleteUserMenu } from '../../src/components/DeleteUserMenu';
import { ParsedUrlQuery } from 'querystring'

import { UserPost } from '../../src/components/UserPost'

import { useUser } from '../../src/hooks/useUser'

type UserPageProps = {
    userData: GetStaticPropsFinalData;
}

export default function UserPage({ userData }: UserPageProps) {
    const [deletingUser, setDeletingUser] = useState(false);

    return (
        <>
            <Head>
                <title>{userData.userName}</title>
            </Head>
            {deletingUser && (
                <DeleteUserMenu close={() => setDeletingUser(false)} />
            )}
            <StyledUserPage>
                <main>
                    <h1>{userData.userName}</h1>

                    {userData.posts.map((post: Post) => (
                        <UserPost key={post.postId} text={post.text} imageUrl={post.imageUrl} date={post.datePost} />
                    ))}
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

    const userData = await useUser(user)
    if (userData === null) return {
        notFound: true
    }
    return {
        props: {
            userData
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

