import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SCREENS } from '@/constants'
import { ExploreStackNavigatorParamList } from '@/models'
import { ExploreScreen } from '@/screens/explore'

const Stack = createNativeStackNavigator<ExploreStackNavigatorParamList>()

export const ExploreNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={SCREENS.EXPLORE_SCREEN} component={ExploreScreen} />
    </Stack.Navigator>
  )
}
