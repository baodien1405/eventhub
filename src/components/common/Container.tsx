import React, { ReactNode } from 'react'
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'

interface ContainerProps {
  isImageBackground?: boolean
  isScroll?: boolean
  title?: string
  children: ReactNode
}

export const Container = ({ isImageBackground, isScroll, children }: ContainerProps) => {
  const renderContent = () => {
    return isScroll ? (
      <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
      <View style={{ flex: 1 }}>{children}</View>
    )
  }

  if (isImageBackground) {
    return (
      <ImageBackground
        source={IMAGES.splashBackground}
        style={{ flex: 1 }}
        imageStyle={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>
      </ImageBackground>
    )
  }
  return <SafeAreaView style={[globalStyles.container]}>{renderContent()}</SafeAreaView>
}
