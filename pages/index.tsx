import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../src/contexts/AuthContext';


export default function Home() {

  let userName = '';
  const { user } = useContext(AuthContext)
  if (!!user) {
    userName = useContext(AuthContext).user.name;
  }
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
  background: #4110e3;
  color:white;

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
        border:none;
        border-radius: 8px;
        padding: 10px;
        outline: none;
        font-size: 11pt;
      }
    }
  }
`