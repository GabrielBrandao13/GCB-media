import { useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { UserSearchApiResponse } from './api/userSearch'

type UserSearchProps = {
    className: string;
}

function UserSearch({ className }: UserSearchProps) {
    const [results, setResults] = useState<UserSearchApiResponse>([])
    const [searchText, setSearchText] = useState('')

    async function getSearchResults() {
        const json = await fetch(`/api/userSearch?q=${searchText}`)
        const data = await json.json() as UserSearchApiResponse

        setResults(data)
    }

    return (
        <>
            <Head>
                <title>Pesquisa</title>
            </Head>
            <main className={className}>
                <h2>Pesquisa</h2>
                <input type="text" name="search" value={searchText} onChange={e => setSearchText(e.target.value)} />
                <button onClick={getSearchResults}>Pesquisar</button>
                {results.map(result => (
                    <p>{result.userName}</p>
                ))}
            </main>
        </>
    )
}

const StyledUserSearch = styled(UserSearch)``

export default StyledUserSearch