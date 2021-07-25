import styled from 'styled-components';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const router = useRouter()

    async function handleCreateNewAccount(e: FormEvent) {
        e.preventDefault()

        if (pass !== confirmPass) {
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user,
                pass
            }),
        })

        // const data = await res.json()
        // console.log(data)

        router.push('/')

    }

    return (
        <StyledRegister>
            <form onSubmit={handleCreateNewAccount}>
                <h1>Registar-se</h1>
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Digite o usuário"
                        onChange={e => setUser(e.target.value)}
                        value={user}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                    />
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        onChange={e => setConfirmPass(e.target.value)}
                        value={confirmPass}
                    />
                </div>
                <div className="buttons">
                    <button type="submit">
                        Registrar-se
                    </button>
                    <p>
                        Já possui uma conta? <Link href="/login"><a>Login</a></Link>
                    </p>
                    <p>
                        Voltar para a <Link href="/"><a>Home</a></Link>
                    </p>
                </div>
            </form>
        </StyledRegister>
    )
}

const StyledRegister = styled.div`
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background:#e3103e;

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
            flex-flow: column nowrap;
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