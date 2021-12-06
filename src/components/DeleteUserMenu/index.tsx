import { FormEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

type DeleteUserMenuPropsType = {
    close: () => void;
}


export function DeleteUserMenu({ close }: DeleteUserMenuPropsType) {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter()

    const [password, setPassword] = useState('')

    async function deleteUser(e: FormEvent) {
        e.preventDefault()

        await fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: user.name,
                password
            })
        })

        logout()

        close()
        router.push('/')
    }
    return (
        <StyledDeleteUserMenu>
            <form onSubmit={deleteUser}>
                <h2>Deletar usuário</h2>

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <div className="buttons">

                    <button type="submit" onClick={deleteUser}>Deletar</button>
                    <button onClick={close}>Cancelar</button>
                </div>
            </form>
        </StyledDeleteUserMenu>
    )
}

const StyledDeleteUserMenu = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);

    form{
        background:white;
        width: 100%;
        max-width: 400px;
        height: 400px;
        display:flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items:center;
        border-radius: 8px;

        > *{
            margin: 5px;
        }

        .buttons{
            width: 70%;
            display:flex;
            gap: 5px;

            button{
                flex:1;
                font-size: 12pt;
                border:none;
                border-radius: 4px;
                background:rgb(70, 10, 211);
                cursor:pointer;
                color:white;
                padding: 3px;

                &[type="submit"]{
                    background:rgb(211, 10, 10);
                }
            }

        }
        h2{
            color:rgb(29, 29, 29);
        }
        input{
            outline:none;
            border: 2px solid gray;
            border-radius: 4px;
            width: 70%;
            padding: 5px;
            font-size: 12pt;
        }
    }
`