import { FacebookLoginPayload } from './../models/auth'
import {
  LoginPayload,
  SuccessResponse,
  SignUpPayload,
  GoogleLoginPayload,
  AuthResponse
} from '@/models'
import axiosClient from './axiosClient'

export const URL_LOGIN = '/login'
export const URL_SIGN_UP = '/sign-up'

export const authApi = {
  register(payload: Omit<SignUpPayload, 'confirmPassword'>): Promise<AuthResponse> {
    return axiosClient.post(URL_SIGN_UP, payload)
  },
  login(payload: LoginPayload): Promise<AuthResponse> {
    return axiosClient.post(URL_LOGIN, payload)
  },
  signInWithGoogle(payload: GoogleLoginPayload): Promise<AuthResponse> {
    return axiosClient.post('/google-sign-in', payload)
  },
  signInWithFacebook(payload: FacebookLoginPayload): Promise<AuthResponse> {
    return axiosClient.post('/facebook-sign-in', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
  getProfile() {
    return axiosClient.get('/profile')
  },
  sendVerificationCode(email: string): Promise<SuccessResponse<{ code: string }>> {
    return axiosClient.post('/verification', { email })
  },
  forgotPassword(email: string): Promise<SuccessResponse<any>> {
    return axiosClient.post('/forgot-password', { email })
  }
}
