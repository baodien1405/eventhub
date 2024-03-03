import { View, StyleSheet, Platform, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { AppButton, AppText, Row, Space } from '@/components'
import { LoginManager } from 'react-native-fbsdk-next'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User
} from 'iconsax-react-native'

import { COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { useAuthStore } from '@/store'
import { clearAS } from '@/utils'

export const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const { reset, profile } = useAuthStore()

  const MENU_LIST = [
    {
      key: 'MY_PROFILE',
      text: 'My Profile',
      icon: <User size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
        navigation.navigate('Profile', {
          screen: SCREENS.PROFILE_SCREEN
        })
      }
    },
    {
      key: 'MESSAGE',
      text: 'Message',
      icon: <Message2 size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'CALENDAR',
      text: 'Calendar',
      icon: <Calendar size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'BOOKMARK',
      text: 'Bookmark',
      icon: <Bookmark2 size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'CONTRACT_US',
      text: 'Contact Us',
      icon: <Sms size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'SETTINGS',
      text: 'Settings',
      icon: <Setting2 size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'HELP_AND_FAQs',
      text: 'Help & FAQs',
      icon: <MessageQuestion size={23} color={COLORS.gray} />,
      onPress: () => {
        navigation.closeDrawer()
      }
    },
    {
      key: 'SIGN_OUT',
      text: 'Sign Out',
      icon: <Logout size={23} color={COLORS.gray} />,
      onPress: () => {
        LoginManager.logOut()
        GoogleSignin.signOut()
        reset()
        clearAS()
        navigation.closeDrawer()
      }
    }
  ]

  return (
    <View style={[styles.container]}>
      <View style={{ marginBottom: 28 }}>
        {profile?.avatar ? (
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: 'coral',
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}
          >
            <AppText
              text={profile?.fullName?.charAt(0)?.toUpperCase() || ''}
              font={FONT_FAMILIES.bold}
              size={25}
              flex={0}
            />
          </View>
        )}

        {profile?.fullName && (
          <AppText text={profile.fullName} size={19} font={FONT_FAMILIES.medium} flex={0} />
        )}
      </View>

      <View style={{ flex: 1, paddingVertical: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={MENU_LIST}
          renderItem={({ item }) => {
            return (
              <Row key={item.key} onPress={item?.onPress} styles={{ marginBottom: 33 }}>
                {item.icon}
                <Space width={14} />
                <AppText text={item.text} size={16} />
              </Row>
            )
          }}
        />
      </View>

      <Row justify="flex-start">
        <AppButton
          hasShadow={false}
          text="Upgrade Pro"
          textColor="#00F8FF"
          color="#00F8FF33"
          textStyles={{ fontSize: 14, paddingLeft: 11 }}
          prefixIcon={<MaterialCommunityIcons name="crown" size={24} color="#00F8FF" />}
        />
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48
  },
  avatar: {
    height: 52,
    width: 52,
    borderRadius: 100,
    marginBottom: 12
  }
})
