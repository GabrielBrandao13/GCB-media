import styled from 'styled-components';
import Link from 'next/link';
import { FormEvent, useState, useContext } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';

export default function Login() {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const { signIn } = useContext(AuthContext);

    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        signIn(user, pass)
    }

    return (
        <StyledLogin>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Usuário"
                        onChange={e => setUser(e.target.value)}
                        value={user}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                    />
                </div>

                <div className="buttons">
                    <button type="submit">
                        Login
                    </button>
                    <p>
                        Não possui uma  conta? <Link href="/register"><a>Registre-se!</a></Link>
                    </p>
                    <p>
                        Voltar para a home <Link href="/"><a>Home</a></Link>
                    </p>

                </div>
            </form>
        </StyledLogin>
    )
}

const StyledLogin = styled.div`
    height: 100vh;
    display:flex;

    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background: #4110e3;

    form{
        display:flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: space-between;
        background: white;
        border-radius: 8px;
        padding: 5px;
        width: 90%;
        max-width: 500px;
        height: 400px;

        > h1{
            color: #121212;
            text-decoration: underline;
        }

        div.inputs{
            display:flex;
            flex-flow: row wrap;
            width: 100%;
            justify-content: center;
            align-items:center;
            gap:8px;

            input{
                flex:0;
                outline:none;
                border: 2px solid gray;
                border-radius: 8px;
                padding: 5px;
            }
        }

        div.buttons{
            display:flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: flex-start;
            width: 100%;

            button{
                border:none;
                background: black;
                color: white;
                border-radius: 8px;
                padding: 5px 15px 5px 15px;
                cursor:pointer;
                font-size:14pt;
            }

            p{
                color: rgb(44, 44, 44);

                a{
                    color: #0028ed;
                }
            }
        }
    }
`