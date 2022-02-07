import styled from 'styled-components';
import Head from 'next/head';
import { useEffect, useState } from 'react';


import { PostsApiResponse } from './api/posts';
import { UserPost } from '../src/components/UserPost';
import { PostsWrapper } from '../src/components/PostsWrapper';

type PostsProps = {
    className: string;
}

function Posts({ className }: PostsProps) {
    const [posts, setPosts] = useState<PostsApiResponse[]>([])

    useEffect(() => {
        fetch('/api/posts').then(res => {
            res.json().then(res => setPosts(res))
        })
    }, [])
    return (
        <>
            <Head>
                <title>Posts mais recentes</title>
            </Head>
            <main className={className}>
                <h2>Posts mais recentes</h2>

                <PostsWrapper>
                    {posts.map(post => (
                        <UserPost date={post.datePost} text={post.text} imageUrl={post.imageUrl} />
                    ))}
                </PostsWrapper>
            </main>
        </>
    )
}

export default styled(Posts)`
    background: red;
    color:white;

    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;
`