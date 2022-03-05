import { useUsersMe } from 'entities/users/api'

export const Profile = () => {
  const { data: me } = useUsersMe()
  return (
    <table>
      <tbody>
        <tr>
          <td>Имя:</td>
          <td>{me?.name || `Не задано`}</td>
        </tr>
        <tr>
          <td>Номер:</td>
          <td>{me?.phoneNumber}</td>
        </tr>
        <tr>
          <td>Аккаунт создан:</td>
          <td>{me?.createdAt}</td>
        </tr>
      </tbody>
    </table>
  )
}
