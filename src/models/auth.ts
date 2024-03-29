import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SuccessResponse, User, AuthStackNavigatorParamList } from '@/models'

export type LoginScreenProps = NativeStackScreenProps<AuthStackNavigatorParamList, 'LoginScreen'>

export type SignUpScreenProps = NativeStackScreenProps<AuthStackNavigatorParamList, 'SignUpScreen'>

export type VerificationScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'VerificationScreen'
>

export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'ForgotPasswordScreen'
>

export interface LoginPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ForgotPasswordPayload {
  email: string
}

export type AuthResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
  user: User
}>

export interface GoogleLoginPayload {
  fullName: string
  email: string
  avatar: string
}

export interface FacebookLoginPayload {
  fullName: string
  email: string
  avatar: string
}
