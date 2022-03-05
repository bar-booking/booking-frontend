import { api } from './api'
import { routes } from './routes'

interface Params {
  access: string
  refresh: string
}

enum Token {
  Access = `access`,
  Refresh = `refresh`,
}

export const updateTokens = ({ access, refresh }: Params) => {
  localStorage.setItem(Token.Access, access)
  localStorage.setItem(Token.Refresh, refresh)
  api.defaults.headers.common.Authorization = `Bearer ${access}`
}

export const obtainTokens = async (
  values: Components.Schemas.ObtainTokenPairDto,
) => {
  const { data } = await api.post<Components.Schemas.TokenPair>(
    routes.authLogin,
    values,
  )

  updateTokens(data)

  return data
}

export const refreshTokens = async () => {
  const { data } = await api.post<Components.Schemas.TokenPair>(
    routes.authRefresh,
    { refresh: localStorage.getItem(Token.Refresh) },
  )

  updateTokens(data)

  return data
}

export const checkAuth = async () => {
  const refresh = localStorage.getItem(Token.Refresh)

  if (!refresh) {
    return false
  }

  try {
    await refreshTokens()
    return true
  } catch (error) {
    localStorage.clear()
    console.error(error)
    return false
  }
}
