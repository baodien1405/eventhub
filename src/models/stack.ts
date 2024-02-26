export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgotPasswordScreen: undefined
  VerificationScreen: {
    fullName: string
    email: string
    password: string
    verificationCode: string
  }
  OnboardingScreen: undefined
  HomeScreen: undefined
}
