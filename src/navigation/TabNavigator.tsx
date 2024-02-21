import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SCREENS } from '@/constants'
import { HomeScreen } from '@/screens/home'

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
    </Tab.Navigator>
  )
}
