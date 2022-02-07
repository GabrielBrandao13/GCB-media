import styled from 'styled-components'

import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { AuthContextProvider } from '../src/contexts/AuthContext';

import { Header } from '../src/components/Header'

const AppContainer = styled.div`
  display:flex;
  flex-flow: column nowrap;
  min-height: 100vh;

  > main {
    flex:1;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <AppContainer>
          <Header />
          <Component {...pageProps} />
        </AppContainer>

      </AuthContextProvider>

    </>

  )
}
export default MyApp
