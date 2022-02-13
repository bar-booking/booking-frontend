import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { render } from 'react-dom'

import { App } from 'app/ui'

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
    <App />
  </React.StrictMode>,
  document.getElementById(`root`),
)
