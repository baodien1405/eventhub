import { LoginPayload, SuccessResponse, SignUpPayload } from '@/models'
import axiosClient from './axiosClient'

export const authApi = {
  register(payload: Omit<SignUpPayload, 'confirmPassword'>) {
    return axiosClient.post('/sign-up', payload)
  },
  login(payload: LoginPayload) {
    return axiosClient.post('/login', payload)
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
