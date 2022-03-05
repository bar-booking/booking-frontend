import { api, routes } from 'shared/api'

export const postTriggerVerification = (
  values: Components.Schemas.TriggerVerificationDto,
) => api.post<void>(routes.authNumber, values)
