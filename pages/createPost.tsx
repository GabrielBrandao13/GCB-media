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
        const res = await fetch('/api/createPost', {
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

        Router.push(`/${user.name}`)

    }


    return (
        <div className={className}>
            <form onSubmit={handleSubmit}>
                <h2>Criar postagem</h2>
                <textarea name="text" id="text" cols={30} rows={10} onChange={e => setText(e.target.value)}></textarea>
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

    form{
        border-radius: 10px;
        width: 100%;
        max-width: 500px;
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        background:rgb(183, 0, 255);
        padding: 10px;

        h2, input[type="file"]{
            color:white;
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
        }
        
        button[type="submit"]{
            padding: 3px;
            border:2px solid rgb(255, 255, 255);
            border-radius: 3px;
            background:none;
            color: rgb(255, 255, 255);
            cursor:pointer;
            font-size: 12pt;
        }
    }
`



export default StyledCreatePost