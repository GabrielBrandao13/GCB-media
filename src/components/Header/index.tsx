import { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { AuthContext } from '../../contexts/AuthContext'

type HeaderProps = {
    className?: string;
}

function Header({ className }: HeaderProps) {
    const { user, logout } = useContext(AuthContext)
    return (
        <header className={className}>
            <Link href="/"><h2 className="logo">GCB media</h2></Link>

            {user !== null ? (
                <>
                    <h2>{user.name}</h2>
                    <Link href="/home"><a>Home</a></Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link href="/login"><a>Login</a></Link>
                    <Link href="/register"><a>Registrar</a></Link>
                </>
            )}
        </header>
    )
}

const StyledHeader = styled(Header)`
    display:flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    background-color:#ffffff;
    height: 100px;

    & > *{
        margin: 10px;
    }

    & > *:nth-child(1){
        margin-right: auto;
    }

    a{
        color:rgb(26, 26, 26);
        text-decoration:none;
        font-size: 14pt;
    }

    button{
        border-radius: 3px;
        border:none;
        outline:none;
        padding: 5px;
        font-size: 10pt;
        cursor:pointer;
        background:black;
        color:white;
    }
    .logo{
        cursor:pointer;
    }
`

export { StyledHeader as Header }