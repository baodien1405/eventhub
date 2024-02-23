import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { AppText } from '@/components'
import { globalStyles } from '@/styles'
import { COLORS } from '@/constants'

interface AppButtonProps {
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
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            globalStyles.button,
            globalStyles.shadow,
            {
              backgroundColor: color,
              width: '80%'
            },
            styles
          ]}
        >
          {prefixIcon && <View>{prefixIcon}</View>}

          <AppText
            text={text}
            color={textColor}
            styles={[
              textStyles,
              {
                paddingLeft: prefixIcon ? 20 : 0,
                marginLeft: suffixIcon ? 30 : 0,
                textAlign: 'center'
              }
            ]}
            flex={suffixIcon ? 1 : 0}
          />

          {suffixIcon && <View>{suffixIcon}</View>}
        </TouchableOpacity>
      </View>
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
