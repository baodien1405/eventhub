import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { RootStackParamList } from '@/models'
import { ProfileScreen } from '@/screens/profile'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.PROFILE_SCREEN} component={ProfileScreen} />
    </Stack.Navigator>
  )
}
