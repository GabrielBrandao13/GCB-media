import styled from 'styled-components';
import { FormEvent, useContext, useState } from 'react';

import { AuthContext } from '../../../contexts/AuthContext'

function DeleteUserMenu() {
    const { deleteUser, user } = useContext(AuthContext)

    const [inputPassword, setInputPassword] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        deleteUser(user.name, inputPassword)
    }

    return (
        <StyledDeleteUserMenu>
            <form onSubmit={handleSubmit}>
                <h2>Deletar usuário</h2>
                <p>Tem certeza de que deseja deletar seu usuário?(isso não poderá ser desfeito)</p>

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={e => setInputPassword(e.target.value)}
                    value={inputPassword}
                />
                <div className="buttons">
                    <button type="submit">Deletar</button>
                </div>
            </form>
        </StyledDeleteUserMenu>
    )
}

const StyledDeleteUserMenu = styled.div`
    form{
        display:flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items:center;
        border-radius: 8px;
        width: 300px;
        min-height: 200px;
        background: white;
        padding: 5px;

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
        p {
            color: rgb(35, 35, 35);
            width: 70%;
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

export { DeleteUserMenu }