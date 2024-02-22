import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { globalStyles } from '@/styles'

interface SectionProps {
  children: ReactNode
  styles?: StyleProp<ViewStyle>
}

export const Section = ({ children, styles }: SectionProps) => {
  return <View style={[globalStyles.section, styles]}>{children}</View>
}
