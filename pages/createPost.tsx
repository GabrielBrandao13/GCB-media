import styled from 'styled-components'
import { FormEvent, useContext, useState } from 'react'

import { AuthContext } from '../src/contexts/AuthContext'
import Router from 'next/router'

type CreatePostProps = {
    className: string;
}

function CreatePost({ className }: CreatePostProps) {
    const { user } = useContext(AuthContext)

    const [text, setText] = useState('')
    const imageUrl = ''

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (text.trim() === '') return;

        await fetch('/api/createPost', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.id,
                imageUrl,
                text
            })
        })

        Router.push('/home')

    }


    return (
        <div className={className}>
            <form onSubmit={handleSubmit}>
                <h2>Criar postagem</h2>
                <textarea
                    name="text" id="text" cols={30} rows={10}
                    onChange={e => setText(e.target.value)}
                    placeholder="Digite o texto de sua postagem..."
                >
                </textarea>
                <input type="file" name="image" id="image" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

const StyledCreatePost = styled(CreatePost)`
    display:flex;
    flex-flow:column nowrap;
    align-items:center;
    justify-content: center;
    min-height: 100vh;
    background:rgb(183, 0, 255);

    form{
        border-radius: 10px;
        width: 100%;
        max-width: 500px;
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        padding: 10px;
        background:white;

        h2, input[type="file"]{
            color:rgb(28, 28, 28);
        }

        & > *{
            margin: 5px;
        }
        
        & > *:is(textarea, input){
            width: 95%;
        }


        textarea{
            resize:none;
            border:none;
            border-radius: 5px;
            outline: none;
            box-shadow: 0 0 5px rgba(0, 0, 0, .3);
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 12pt;
        }
        
        button[type="submit"]{
            border:none;
            border-radius: 5px;
            background:none;
            color: rgb(255, 255, 255);
            background:black;
            cursor:pointer;
            font-size: 12pt;
            padding: 5px;
        }
    }
`



export default StyledCreatePost