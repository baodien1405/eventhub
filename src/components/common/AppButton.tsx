import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { AppText } from '@/components'
import { globalStyles } from '@/styles'
import { COLORS } from '@/constants'

interface AppButtonProps {
  icon?: ReactNode
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
  text: string
  type?: 'primary' | 'text' | 'link'
  color?: string
  styles?: StyleProp<ViewStyle>
  textColor?: string
  textStyles?: StyleProp<TextStyle>
  onPress?: () => void
}

export const AppButton = ({
  prefixIcon,
  suffixIcon,
  color = COLORS.primary,
  type = 'primary',
  text,
  styles,
  textColor,
  textStyles,
  onPress
}: AppButtonProps) => {
  if (type === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          globalStyles.button,
          {
            backgroundColor: color
          },
          styles
        ]}
      >
        {prefixIcon && <View>{prefixIcon}</View>}

        <AppText text={text} color={textColor} styles={textStyles} />

        {suffixIcon && <View>{suffixIcon}</View>}
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText
        text={text}
        flex={0}
        color={type === 'link' ? COLORS.primary : COLORS.text}
        styles={textStyles}
      />
    </TouchableOpacity>
  )
}
