interface VerificationScreenParams {
  fullName: string
  email: string
  password: string
  verificationCode: string
}

export type RootStackParamList = {
  MainScreen: undefined
}

export type AuthStackNavigatorParamList = {
  LoginScreen: undefined
  SignUpScreen: undefined
  ForgotPasswordScreen: undefined
  VerificationScreen: VerificationScreenParams
  OnboardingScreen: undefined
}

export type ExploreStackNavigatorParamList = {
  ExploreScreen: undefined
}

export type EventStackNavigatorParamList = {
  EventScreen: undefined
  EventDetailsScreen: undefined
  AddEditEventScreen: { eventId?: string }
}

export type MapStackNavigatorParamList = {
  MapScreen: undefined
}

export type ProfileStackNavigatorParamList = {
  ProfileScreen: undefined
}

export type BottomTabNavigatorParamList = {
  Explore: ExploreStackNavigatorParamList
  Events: EventStackNavigatorParamList
  Map: MapStackNavigatorParamList
  Profile: ProfileStackNavigatorParamList
  AddEditEventScreen: { eventId?: string }
}

export type DrawerNavigatorParamList = {
  Drawer: BottomTabNavigatorParamList
}
