import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { TabNavigator } from '@/navigation'

export const MainNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.MAIN_SCREEN} component={TabNavigator} />
    </Stack.Navigator>
  )
}
