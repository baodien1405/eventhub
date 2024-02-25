import { SignUpPayload } from '@/models'

export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgotPasswordScreen: undefined
  VerificationScreen: Omit<SignUpPayload, 'confirmPassword'>
  OnboardingScreen: undefined
  HomeScreen: undefined
}
