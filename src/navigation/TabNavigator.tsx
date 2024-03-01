import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { EventsNavigator, ExploreNavigator, MapNavigator, ProfileNavigator } from '@/navigation'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Events" component={EventsNavigator} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  )
}
