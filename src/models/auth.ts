import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './stack'

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>

export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>

export type VerificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VerificationScreen'
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
