/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { TabNavigator } from '@/navigation'
import { CustomDrawer } from '@/components'

export const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerPosition: 'left' }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Drawer" component={TabNavigator} />
    </Drawer.Navigator>
  )
}
