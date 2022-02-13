import { api, routes } from 'shared/api'

export const postAuthNumber = (values: Components.Schemas.PostNumberDto) =>
  api.post<void>(routes.authNumber, values)

export const postAuthCode = (values: Components.Schemas.PostCodeDto) =>
  api.post<void>(routes.authCode, values)
