import useSWR from 'swr'

import { routes } from 'shared/api'

export const useUsersMe = () => useSWR<Components.Schemas.User>(routes.usersMe)
