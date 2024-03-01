/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AddSquare, Calendar, Location, Profile } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { EventsNavigator, ExploreNavigator, MapNavigator, ProfileNavigator } from '@/navigation'
import { COLORS, SCREENS } from '@/constants'
import { AppText } from '@/components'
import { AddEventScreen } from '@/screens/common'
import { globalStyles } from '@/styles'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabel: ({ focused }) => (
          <AppText
            text={route.name}
            size={12}
            flex={0}
            color={focused ? COLORS.primary : COLORS.gray5}
            styles={{ marginBottom: Platform.OS === 'android' ? 12 : 0 }}
          />
        )
      })}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="explore"
              size={23}
              color={focused ? COLORS.primary : COLORS.gray5}
            />
          )
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Calendar size={23} color={focused ? COLORS.primary : COLORS.gray5} variant="Bold" />
          )
        }}
      />
      <Tab.Screen
        name={SCREENS.ADD_EVENT_SCREEN}
        component={AddEventScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity onPress={() => {}}>
              <View style={[globalStyles.shadow, styles.addEventIconContainer]}>
                <AddSquare size={23} color={COLORS.white} variant="Bold" />
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Location size={23} color={focused ? COLORS.primary : COLORS.gray5} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Profile size={23} color={focused ? COLORS.primary : COLORS.gray5} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 88 : 68,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  tabBarIconStyle: {
    marginTop: 8
  },
  addEventIconContainer: {
    height: 46,
    width: 46,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginTop: -24
  }
})
