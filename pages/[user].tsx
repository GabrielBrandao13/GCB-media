import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../src/contexts/AuthContext';
import Link from 'next/link';

type UserInfoType = {
    id?: number;
    name?: string;
    exists?: boolean;
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
        if (data.sucess) {
            return setUserInfo({ ...data.user, exists: true })
        }
        // console.log(data)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            {userInfo.exists ? (

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

