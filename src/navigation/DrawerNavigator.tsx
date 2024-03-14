/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { TabNavigator } from '@/navigation'
import { CustomDrawer } from '@/components'
import { DrawerNavigatorParamList } from '@/models'

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>()

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerPosition: 'left' }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Drawer" component={TabNavigator} />
    </Drawer.Navigator>
  )
}
