import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { MapStackNavigatorParamList } from '@/models'
import { MapScreen } from '@/screens/map'

const Stack = createNativeStackNavigator<MapStackNavigatorParamList>()

export const MapNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.MAP_SCREEN} component={MapScreen} />
    </Stack.Navigator>
  )
}
