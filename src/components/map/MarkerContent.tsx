import React from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'
import { ArtSVG, FoodSVG, MusicSVG, SportSVG } from '@/assets/svg'

interface MarkerContentProps {
  category: string
  onPress?: () => void
}

export const MarkerContent = ({ category, onPress }: MarkerContentProps) => {
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

  const foundCategory = ICON_CATEGORY_LIST.find((x) => x.category === category)

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={IMAGES.marker}
        style={[
          globalStyles.shadow,
          {
            width: 56,
            height: 56,
            padding: 6,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        imageStyle={{
          width: 56,
          height: 56,
          resizeMode: 'contain'
        }}
      >
        <View
          style={{
            backgroundColor: foundCategory?.bgColor,
            width: 30,
            height: 30,
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
