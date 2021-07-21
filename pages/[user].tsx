import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function UserPage() {
    const router = useRouter();

    const { user } = router.query;

    return (
        <StyledUserPage>
            <header>
                <h2>Bem vindo(a), {user}</h2>
            </header>
            <main>
                <h1>Bem vindo(a)</h1>
                <p>No momento não temos nada a exibir</p>
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

