import { LoginPayload, SuccessResponse, SignUpPayload } from '@/models'
import axiosClient from './axiosClient'

export const URL_LOGIN = '/login'
export const URL_SIGN_UP = '/sign-up'

export const authApi = {
  register(payload: Omit<SignUpPayload, 'confirmPassword'>) {
    return axiosClient.post(URL_SIGN_UP, payload)
  },
  login(payload: LoginPayload) {
    return axiosClient.post(URL_LOGIN, payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
  getProfile() {
    return axiosClient.get('/profile')
  },
  sendVerificationCode(email: string): Promise<SuccessResponse<{ code: string }>> {
    return axiosClient.post('/verification', { email })
  }
}
