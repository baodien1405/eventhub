interface VerificationScreenParams {
  fullName: string
  email: string
  password: string
  verificationCode: string
}

export type RootStackParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgotPasswordScreen: undefined
  VerificationScreen: VerificationScreenParams
  OnboardingScreen: undefined
  MainScreen: undefined
  ExploreScreen: undefined
  EventScreen: undefined
  EventDetailsScreen: undefined
  MapScreen: undefined
  ProfileScreen: undefined
}
