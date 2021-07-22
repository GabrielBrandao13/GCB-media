import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';

import { useContext } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';


export default function Home() {
  const { userName } = useContext(AuthContext)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <StyledHome>
        <header>
          {userName && (
            <h1>Bem vindo(a), {userName}</h1>
          )}
          <a><Link href="/login">Login</Link></a>
          <a><Link href="/register">Registrar-se</Link></a>
        </header>
        <main>
          <h1>Bem vindo(a)!</h1>
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
  }
`