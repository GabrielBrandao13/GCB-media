import styled from 'styled-components'
import Head from 'next/head'

type HomeProps = {
    className?: string;
}

function Home({ className }: HomeProps) {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <main className={className}>

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
`

export default StyledHome