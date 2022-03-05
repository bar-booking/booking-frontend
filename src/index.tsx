import { AxiosRequestConfig } from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { render } from 'react-dom'
import { SWRConfig } from 'swr'

import { App } from 'app/ui'
import { AuthProvider } from 'processes/auth/lib'
import { api } from 'shared/api'

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

const auth = getAuth()
auth.useDeviceLanguage()

render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url: string, config?: AxiosRequestConfig) =>
          api.get(url, config).then((response) => response.data),
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById(`root`),
)
