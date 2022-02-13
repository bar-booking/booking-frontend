import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'

export const useCaptcha = <
  CaptchaContainerRef extends HTMLElement = HTMLElement,
>() => {
  const ref = useRef<CaptchaContainerRef>(null)
  const [captcha, setCaptcha] = useState<string>()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    new RecaptchaVerifier(ref.current, { size: `invisible` }, getAuth())
      .verify()
      .then(setCaptcha)
  }, [ref])

  return { ref, captcha }
}
