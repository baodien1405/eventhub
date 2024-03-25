import React from 'react'
import { FlatList } from 'react-native'

import { Tag } from '@/components'
import {
  ArtFillSVG,
  ArtSVG,
  FoodFillSVG,
  FoodSVG,
  MusicFillSVG,
  MusicSVG,
  SportFillSVG,
  SportSVG
} from '@/assets/svg'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'

interface CategoryListProps {
  isFill?: boolean
}

export const CategoryList = ({ isFill = true }: CategoryListProps) => {
  const CATEGORY_LIST = [
    {
      key: 'SPORTS',
      label: 'Sports',
      bgColor: isFill ? '#F0635A' : COLORS.white,
      icon: isFill ? <SportSVG /> : <SportFillSVG />,
      onPress: () => {}
    },
    {
      key: 'MUSIC',
      label: 'Music',
      bgColor: isFill ? '#F59762' : COLORS.white,
      icon: isFill ? <MusicSVG /> : <MusicFillSVG />,
      onPress: () => {}
    },
    {
      key: 'FOOD',
      label: 'Food',
      bgColor: isFill ? '#29D697' : COLORS.white,
      icon: isFill ? <FoodSVG /> : <FoodFillSVG />,
      onPress: () => {}
    },
    {
      key: 'ART',
      label: 'Art',
      bgColor: isFill ? '#46CDFB' : COLORS.white,
      icon: isFill ? <ArtSVG /> : <ArtFillSVG />,
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
          style={[{ marginRight: 12, width: 100 }, globalStyles.shadow]}
          textStyle={{ fontFamily: FONT_FAMILIES.medium }}
          textColor={isFill ? COLORS.white : '#8A8D9F'}
          onPress={item.onPress}
        />
      )}
    />
  )
}
