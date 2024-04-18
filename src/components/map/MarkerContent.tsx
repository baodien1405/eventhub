import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'
import { ArtSVG, FoodSVG, MusicSVG, SportSVG } from '@/assets/svg'

const ICON_CATEGORY_LIST = [
  {
    category: 'sports',
    bgColor: '#F0635A',
    icon: <SportSVG />
  },
  {
    category: 'music',
    bgColor: '#F59762',
    icon: <MusicSVG />
  },
  {
    category: 'food',
    bgColor: '#29D697',
    icon: <FoodSVG />
  },
  {
    category: 'art',
    bgColor: '#46CDFB',
    icon: <ArtSVG />
  }
]

interface MarkerContentProps {
  category: string
  onPress?: () => void
}

export const MarkerContent = ({ category, onPress }: MarkerContentProps) => {
  const foundCategory = ICON_CATEGORY_LIST.find((x) => x.category === category)

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={IMAGES.marker}
        style={[globalStyles.shadow, styles.imageBg]}
        imageStyle={styles.image}
      >
        <View
          style={{
            backgroundColor: foundCategory?.bgColor,
            width: 34,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8
          }}
        >
          {foundCategory?.icon}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageBg: {
    width: 56,
    height: 56,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  }
})
