import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

function useAuth() {
    const authInfo = useContext(AuthContext)
    return authInfo;
}

export { useAuth }