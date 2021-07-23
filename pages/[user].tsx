import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../src/contexts/AuthContext';
import Link from 'next/link';

type UserInfoType = {
    id?: number;
    name?: string;
}

export default function UserPage() {
    const router = useRouter();

    const { user } = router.query;
    const [userInfo, setUserInfo] = useState<UserInfoType>({})

    const currentUser = useContext(AuthContext).userName

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
        setUserInfo(data.user)
        // console.log(data)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <StyledUserPage>
            <header>
                {userInfo.name == currentUser ? (
                    <h1>Bem vindo(a) de volta! {currentUser}</h1>
                ) : (
                    <h1>{user}</h1>
                )}
            </header>
            <main>
                <h1>Bem vindo(a)</h1>
                <p>No momento não temos nada a exibir</p>
                <Link href="/">Home</Link>
            </main>
        </StyledUserPage>
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
        height: 100px;

        > *{
            margin: 5px;
        }
    }

    main{
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
    }
`

