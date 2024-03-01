import React, { ReactNode } from 'react'
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'

import { COLORS } from '@/constants'

interface CircleProps {
  size: number
  color?: string
  children: ReactNode
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const Circle = ({
  size = 36,
  color = COLORS.primary,
  children,
  style,
  onPress
}: CircleProps) => {
  const localStyle: StyleProp<ViewStyle> = {
    height: size,
    width: size,
    borderRadius: 100,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center'
  }

  if (onPress) {
    return (
      <TouchableOpacity style={[localStyle, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }

  return <View style={[localStyle, style]}>{children}</View>
}
