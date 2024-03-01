import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { RootStackParamList } from '@/models'
import { EventScreen } from '@/screens/events'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const EventsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.EVENT_SCREEN} component={EventScreen} />
    </Stack.Navigator>
  )
}
