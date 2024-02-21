import { ActivityIndicator, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

import { IMAGES } from '@/assets/images'
import { APP, COLORS } from '@/constants'
import { Space } from '@/components'

export const SplashScreen = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={IMAGES.splashBackground}
      imageStyle={{ flex: 1 }}
    >
      <Image source={IMAGES.logo} style={styles.logo} />
      <Space height={16} />
      <ActivityIndicator size={22} color={COLORS.gray} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: APP.sizes.WIDTH * 0.7,
    resizeMode: 'contain'
  }
})
