import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { LoginScreen, OnboardingScreen, SignUpScreen } from '@/screens/auth'
import { RootStackParamList } from '@/models'

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
    </Stack.Navigator>
  )
}
