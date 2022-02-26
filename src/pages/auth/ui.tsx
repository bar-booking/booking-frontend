import { Button, Form, Input } from 'antd'
import React from 'react'

import { useAuth, useCaptcha } from './lib'

export const Auth = () => {
  const { ref, captcha } = useCaptcha<HTMLDivElement>()
  const { handleSubmitNumber, handleSubmitCode, isNumberSubmitted } = useAuth({
    recaptchaToken: captcha,
  })

  return (
    <div>
      <div ref={ref} />
      {isNumberSubmitted ? (
        <Form onFinish={handleSubmitCode}>
          <Form.Item name='code'>
            <Input size='large' />
          </Form.Item>
          <Form.Item>
            <Button block htmlType='submit' size='large'>
              Капча
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form onFinish={handleSubmitNumber}>
          <Form.Item name='phoneNumber'>
            <Input size='large' />
          </Form.Item>
          <Form.Item>
            <Button block htmlType='submit' size='large'>
              Вход
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
