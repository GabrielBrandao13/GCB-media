import styled from 'styled-components';
import Head from 'next/head'
import { useState } from 'react';
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next'

import { Post } from '../api/listPosts'

import { ParsedUrlQuery } from 'querystring'

import { UserPost } from '../../src/components/UserPost'

import { useUser } from '../../src/hooks/useUser'

type UserPageProps = {
    userData: GetStaticPropsFinalData;
    className?: string;
}

function UserPage({ userData, className }: UserPageProps) {
    return (
        <>
            <Head>
                <title>{userData.userName}</title>
            </Head>
            <main className={className}>
                <h1>{userData.userName}</h1>

                {userData.posts.map((post: Post) => (
                    <UserPost key={post.postId} text={post.text} imageUrl={post.imageUrl} date={post.datePost} />
                ))}
            </main>
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

const StyledUserPage = styled(UserPage)`
    background-color: #1029e3;
    height: 100vh;
    color:white;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
`

export default StyledUserPage