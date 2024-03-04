import React from 'react'
import { FlatList } from 'react-native'

import { Tag } from '@/components'
import { ArtSVG, FoodSVG, MusicSVG, SportSVG } from '@/assets/svg'
import { FONT_FAMILIES } from '@/constants'

export const CategoryList = () => {
  const CATEGORY_LIST = [
    {
      key: 'SPORTS',
      label: 'Sports',
      bgColor: '#F0635A',
      icon: <SportSVG />,
      onPress: () => {}
    },
    {
      key: 'MUSIC',
      label: 'Music',
      bgColor: '#F59762',
      icon: <MusicSVG />,
      onPress: () => {}
    },
    {
      key: 'FOOD',
      label: 'Food',
      bgColor: '#29D697',
      icon: <FoodSVG />,
      onPress: () => {}
    },
    {
      key: 'ART',
      label: 'Art',
      bgColor: '#46CDFB',
      icon: <ArtSVG />,
      onPress: () => {}
    }
  ]

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={CATEGORY_LIST}
      renderItem={({ item }) => (
        <Tag
          key={item.key}
          label={item.label}
          bgColor={item.bgColor}
          icon={item.icon}
          style={{ marginRight: 12, width: 100 }}
          textStyle={{ fontFamily: FONT_FAMILIES.medium }}
          onPress={item.onPress}
        />
      )}
    />
  )
}
