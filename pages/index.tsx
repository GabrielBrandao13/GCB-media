import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';


export default function Home() {
  const userName = useContext(AuthContext).user.name;
  const router = useRouter();

  const [userSearch, setUserSearch] = useState('')

  function handleSearchUser(e: FormEvent) {
    e.preventDefault()
    router.push(`/${userSearch}`)
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledHome>
        <header>

          <Link href="/login"><a>Login</a></Link>
          <Link href="/register"><a>Registrar-se</a></Link>
        </header>
        <main>
          <h1>Bem vindo(a)!{userName && ` ${userName}`}</h1>
          <form onSubmit={handleSearchUser}>
            <input
              type="text"
              onChange={e => setUserSearch(e.target.value)}
              value={userSearch}
              placeholder="Que usuário deseja conhecer?"
            />
          </form>
        </main>
      </StyledHome>

    </>
  )
}

const StyledHome = styled.div`
  height: 100vh;

  header{
    background-color:#8110e3;
    height: 100px;
    color:white;
    display:flex;
    align-items:center;
    justify-content: flex-end;

    > *{
      margin: 5px;
    }

    a{
      text-decoration:none;
      color:white;
      font-size: 15pt;
      padding: 2px;
      transition: .2s;
      border-radius: 3px;
      display:inline-block;

      &:hover{
        background: rgba(0, 0, 0, .3);
      }
    }
  }

  main{
    display:flex;
    flex-flow: column nowrap;
    align-items:center;

    form{
      width: 100%;
      max-width: 400px;
      display:flex;
      flex-flow: column nowrap;
      align-items: center;
      input{
        width: 100%;
        border: 2px solid gray;
        border-radius: 8px;
        padding: 4px;
        outline: none;
      }
    }
  }
`