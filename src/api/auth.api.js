import { authRoutes } from '@/helpers/routes'
import requestOptions from '@/helpers/request-options'

export const authApi={
  loginData(success, failure) {
    requestOptions.get(authRoutes.LoginData, {}, success, failure)
  },
  login(data, success, failure) {
    requestOptions.post(authRoutes.Login, data, success, failure)
  },
  logout(success) {
    requestOptions.post(authRoutes.Logout, {}, success, () => false)
  }
}