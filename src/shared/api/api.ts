import { notification } from 'antd'
import axios from 'axios'

export const baseURL = process.env.REACT_APP_BACKEND_URL

export const api = axios.create({ baseURL })

api.interceptors.response.use(undefined, async (error) => {
  notification.error({
    message: `Ошибка запроса`,
    description: error.response.data.message,
  })

  throw new error()
})
