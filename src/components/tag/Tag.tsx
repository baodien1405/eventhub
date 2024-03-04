import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'

import { COLORS } from '@/constants'
import { AppText, Row } from '@/components'
import { globalStyles } from '@/styles'

interface TagProps {
  label: string
  icon?: ReactNode
  textColor?: string
  bgColor?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: () => void
}

export const Tag = ({
  label,
  icon,
  textColor = COLORS.white,
  bgColor = COLORS.white,
  style,
  textStyle,
  onPress
}: TagProps) => {
  return (
    <Row
      styles={[
        globalStyles.tag,
        {
          backgroundColor: bgColor
        },
        style
      ]}
      onPress={onPress}
    >
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <AppText text={label} color={textColor} styles={textStyle} flex={0} />
    </Row>
  )
}
