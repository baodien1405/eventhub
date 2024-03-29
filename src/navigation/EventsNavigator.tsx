import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { EventStackNavigatorParamList } from '@/models'
import { EventDetailsScreen, EventScreen } from '@/screens/events'

const Stack = createNativeStackNavigator<EventStackNavigatorParamList>()

export const EventsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.EVENT_SCREEN} component={EventScreen} />
      <Stack.Screen name={SCREENS.EVENT_DETAILS_SCREEN} component={EventDetailsScreen} />
    </Stack.Navigator>
  )
}
