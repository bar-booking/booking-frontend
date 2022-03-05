import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  createContext,
  Dispatch,
  useContext,
} from 'react'

import { checkAuth } from 'shared/api'

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<{
  isAuthorized: boolean
  setIsAuthorized: Dispatch<boolean>
}>({ isAuthorized: false, setIsAuthorized: () => {} })

export const AuthProvider = ({ children }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
      .then(setIsAuthorized)
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo(
    () => ({ isAuthorized, setIsAuthorized }),
    [isAuthorized],
  )

  if (isLoading) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
