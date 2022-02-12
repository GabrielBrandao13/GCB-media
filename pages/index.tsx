import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FormEvent, useState } from 'react';
import { useAuth } from '../src/hooks/useAuth';

export default function Home() {

  const { user } = useAuth()
  const router = useRouter();

  const [userSearch, setUserSearch] = useState('')

  function handleSearchUser(e: FormEvent) {
    e.preventDefault()
    router.push(`/users/${userSearch}`)
  }
  return (
    <>
      <Head>
        <title>GCB media - início</title>
      </Head>
      <StyledHome>
        <h1>Bem vindo(a)!{user.name && ` ${user.name}`}</h1>
        <form onSubmit={handleSearchUser}>
          <input
            type="text"
            onChange={e => setUserSearch(e.target.value)}
            value={userSearch}
            placeholder="Que usuário deseja conhecer?"
          />
        </form>
      </StyledHome>

    </>
  )
}

const StyledHome = styled.main`
  background: #4110e3;
  color:white;

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
`