import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  console.log('🚀 ~ CustomDrawer ~ props:', props)
  return (
    <View>
      <Text>CustomDrawer</Text>
    </View>
  )
}
