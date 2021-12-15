import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthContextProvider } from '../src/contexts/AuthContext';
import { ShowMenuContextProvider } from '../src/contexts/ShowMenuContext'

import { Header } from '../src/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <ShowMenuContextProvider>
          <Header />
          <Component {...pageProps} />
        </ShowMenuContextProvider>

      </AuthContextProvider>

    </>

  )
}
export default MyApp
