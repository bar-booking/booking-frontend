import { notification } from 'antd'
import axios from 'axios'

import { refreshTokens } from './auth'

export const baseURL = process.env.REACT_APP_BACKEND_URL

export const api = axios.create({ baseURL })

api.interceptors.response.use(undefined, async (error) => {
  notification.error({
    message: `Ошибка запроса`,
    description: error.response.data.message,
  })

  await Promise.reject(error)
})

const createResponseInterceptor = () => {
  const interceptor = api.interceptors.response.use(
    undefined,
    async (error) => {
      if (error.response.status !== 401) {
        notification.error({
          message: `Ошибка запроса`,
          description: error.response.data.message,
        })

        await Promise.reject(error)
      }

      api.interceptors.response.eject(interceptor)

      try {
        const { access } = await refreshTokens()
        error.response.config.headers[`Authorization`] = `Bearer ${access}`
        return await api(error.response.config)
      } catch (error) {
        localStorage.clear()
        await Promise.reject(error)
      } finally {
        createResponseInterceptor()
      }
    },
  )
}

createResponseInterceptor()
