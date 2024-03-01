import { ArrowDown2, HambergerMenu, Notification } from 'iconsax-react-native'
import React from 'react'
import { Platform, StatusBar, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'

import { AppText, Circle, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'
import { ExploreScreenProps } from '@/models'

export const ExploreScreen = ({ navigation }: ExploreScreenProps) => {
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 179,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 33,
          borderBottomRightRadius: 33
        }}
      >
        <Row>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <HambergerMenu size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Row>
              <AppText
                text="Current Location"
                flex={0}
                color={COLORS.white}
                styles={{ opacity: 0.7 }}
                size={12}
              />
              <ArrowDown2 variant="Bold" size={14} color={COLORS.white2} />
            </Row>

            <AppText
              text="New York, USA"
              size={13}
              flex={0}
              color="#F4F4FE"
              font={FONT_FAMILIES.medium}
            />
          </View>

          <Circle size={36} color="#5D56F3">
            <View>
              <Notification size={18} color={COLORS.white} />

              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 100,
                  backgroundColor: '#02E9FE',
                  borderWidth: 2,
                  borderColor: '#524CE0',
                  position: 'absolute',
                  top: -2,
                  right: -1
                }}
              />
            </View>
          </Circle>
        </Row>
      </View>
    </View>
  )
}
