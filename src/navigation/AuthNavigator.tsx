import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { SCREENS } from '@/constants'
import { RootStackParamList } from '@/models'
import {
  ForgotPasswordScreen,
  LoginScreen,
  OnboardingScreen,
  SignUpScreen,
  VerificationScreen
} from '@/screens/auth'

export const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.ONBOARDING_SCREEN} component={OnboardingScreen} />
      <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SIGN_UP_SCREEN} component={SignUpScreen} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
      <Stack.Screen name={SCREENS.VERIFICATION_SCREEN} component={VerificationScreen} />
    </Stack.Navigator>
  )
}
