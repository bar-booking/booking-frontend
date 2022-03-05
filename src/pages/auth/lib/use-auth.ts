import { notification } from 'antd'
import { useCallback, useState } from 'react'

import { postTriggerVerification } from 'entities/auth/api'
import { useAuthContext } from 'processes/auth/lib'
import { obtainTokens } from 'shared/api'

interface Params {
  recaptchaToken?: string
}

export const useAuth = ({ recaptchaToken }: Params) => {
  const { setIsAuthorized } = useAuthContext()
  const [isNumberSubmitted, setIsNumberSubmitted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const handleSubmitNumber = useCallback(
    async (
      values: Omit<
        Parameters<typeof postTriggerVerification>[0],
        `recaptchaToken`
      >,
    ) => {
      if (!recaptchaToken) {
        return
      }

      try {
        await postTriggerVerification({ recaptchaToken, ...values })
        notification.success({ message: `Вам отправлено сообщение` })
        setPhoneNumber(values.phoneNumber)
        setIsNumberSubmitted(true)
      } catch (error) {
        console.error(error)
        notification.error({ message: `Ошибка при отправке сообщения` })
      }
    },
    [recaptchaToken],
  )

  const handleSubmitCode = useCallback(
    async (values: Omit<Parameters<typeof obtainTokens>[0], `phoneNumber`>) => {
      if (!phoneNumber) {
        return
      }

      try {
        await obtainTokens({ phoneNumber, ...values })
        setIsAuthorized(true)
        notification.success({ message: `Номер подтверждён` })
      } catch (error) {
        console.error(error)
        notification.error({ message: `Ошибка при подтверждении` })
      }
    },
    [phoneNumber, setIsAuthorized],
  )

  return { handleSubmitNumber, handleSubmitCode, isNumberSubmitted }
}
