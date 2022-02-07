import styled from 'styled-components';
import Head from 'next/head';
import { useEffect, useState } from 'react';


import { PostsApiResponse } from './api/posts';
import { UserPost } from '../src/components/UserPost';

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

                <div className="posts">
                    {posts.map(post => (
                        <UserPost date={post.datePost} imageUrl={post.imageUrl} text={post.text} />
                    ))}
                </div>
            </main>
        </>
    )
}

export default styled(Posts)`
    min-height: 100vh;
    background: red;
    margin: 0;

    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;

    .posts{
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        justify-content:center;

    }
`