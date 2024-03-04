import React from 'react'
import { ArrowRight2 } from 'iconsax-react-native'

import { AppText, Row } from '@/components'
import { FONT_FAMILIES } from '@/constants'

interface TabBarProps {
  title: string
  onPress: () => void
}

export const TabBar = ({ title, onPress }: TabBarProps) => {
  return (
    <Row justify="space-between">
      <AppText text={title} size={18} font={FONT_FAMILIES.medium} flex={0} />

      <Row onPress={onPress}>
        <AppText text="See All" flex={0} color="#747688" />
        <ArrowRight2 variant="Bold" size={14} color="#747688" />
      </Row>
    </Row>
  )
}
