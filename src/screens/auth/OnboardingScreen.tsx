import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'

import { IMAGES } from '@/assets/images'
import { AppText } from '@/components'
import { APP, COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { OnboardingScreenProps } from '@/models'
import { globalStyles } from '@/styles'

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [index, setIndex] = useState(0)

  const handleNext = () => {
    if (index < 2) {
      setIndex((prevIndex) => prevIndex + 1)
    } else {
      navigation.navigate(SCREENS.LOGIN_SCREEN)
    }
  }

  return (
    <View style={[globalStyles.container]}>
      <Swiper
        style={styles.wrapper}
        loop={false}
        activeDotColor={COLORS.white}
        index={index}
        onIndexChanged={(num) => setIndex(num)}
      >
        <Image source={IMAGES.onboardingFirst} style={styles.image} />
        <Image source={IMAGES.onboardingSecond} style={styles.image} />
        <Image source={IMAGES.onboardingThird} style={styles.image} />
      </Swiper>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}>
          <AppText text="Skip" color={COLORS.gray2} font={FONT_FAMILIES.medium} size={18} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <AppText text="Next" color={COLORS.white} font={FONT_FAMILIES.medium} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  image: {
    flex: 1,
    width: APP.sizes.WIDTH,
    height: APP.sizes.HEIGHT,
    resizeMode: 'cover'
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingVertical: 22,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
