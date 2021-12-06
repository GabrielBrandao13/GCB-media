import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../src/contexts/AuthContext';
import { Header } from '../src/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Component {...pageProps} />

      </AuthContextProvider>

    </>

  )
}
export default MyApp
