import { View, Text } from 'react-native'
import React from 'react'

import { AppButton, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'

export const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>

      <Space height={50} />

      <AppButton
        text="Login"
        textColor={COLORS.white}
        textStyles={{
          fontSize: 16,
          fontFamily: FONT_FAMILIES.medium,
          fontWeight: '400',
          flex: 0,
          textTransform: 'uppercase'
        }}
      />
    </View>
  )
}
