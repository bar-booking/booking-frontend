import 'antd/dist/antd.min.css'
import 'app/styles/index.css'

import { Auth } from 'pages/auth/ui'
import { Profile } from 'pages/profile/ui'
import { useAuthContext } from 'processes/auth/lib'

export const App = () => {
  const { isAuthorized } = useAuthContext()

  return isAuthorized ? <Profile /> : <Auth />
}
