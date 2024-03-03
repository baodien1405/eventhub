import { API_ENDPOINTS } from '@/constants'
import { FacebookLoginPayload } from './../models/auth'
import {
  LoginPayload,
  SuccessResponse,
  SignUpPayload,
  GoogleLoginPayload,
  AuthResponse
} from '@/models'
import axiosClient from './axiosClient'

export const authApi = {
  register(payload: Omit<SignUpPayload, 'confirmPassword'>): Promise<AuthResponse> {
    return axiosClient.post(API_ENDPOINTS.URL_SIGN_UP, payload)
  },
  login(payload: LoginPayload): Promise<AuthResponse> {
    return axiosClient.post(API_ENDPOINTS.URL_LOGIN, payload)
  },
  signInWithGoogle(payload: GoogleLoginPayload): Promise<AuthResponse> {
    return axiosClient.post(API_ENDPOINTS.URL_SIGN_IN_GOOGLE, payload)
  },
  signInWithFacebook(payload: FacebookLoginPayload): Promise<AuthResponse> {
    return axiosClient.post(API_ENDPOINTS.URL_SIGN_IN_FACEBOOK, payload)
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
