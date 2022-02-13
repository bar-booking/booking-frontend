import { notification } from 'antd'
import { useCallback, useState } from 'react'

import { postAuthCode, postAuthNumber } from 'entities/auth/api'

interface Params {
  recaptchaToken?: string
}

export const useAuth = ({ recaptchaToken }: Params) => {
  const [isNumberSubmitted, setIsNumberSubmitted] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>()

  const handleSubmitNumber = useCallback(
    async (
      values: Omit<Components.Schemas.PostNumberDto, `recaptchaToken`>,
    ) => {
      if (!recaptchaToken) {
        return
      }

      try {
        await postAuthNumber({ recaptchaToken, ...values })
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
    async (values: Omit<Components.Schemas.PostCodeDto, `phoneNumber`>) => {
      if (!phoneNumber) {
        return
      }

      try {
        await postAuthCode({ phoneNumber, ...values })
        notification.success({ message: `Номер подтверждён` })
      } catch (error) {
        console.error(error)
        notification.error({ message: `Ошибка при подтверждении` })
      }
    },
    [phoneNumber],
  )

  return { handleSubmitNumber, handleSubmitCode, isNumberSubmitted }
}
