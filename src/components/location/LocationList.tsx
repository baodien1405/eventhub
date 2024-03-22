import React from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import { AppText } from '@/components'
import { COLORS } from '@/constants'

interface LocationListProps {
  loading?: boolean
  locationList: any[]
  onAddressSelect?: (address: string) => void
}

export const LocationList = ({
  loading,
  locationList = [],
  onAddressSelect
}: LocationListProps) => {
  if (loading) {
    return <ActivityIndicator color={COLORS.gray} size={32} />
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={locationList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginBottom: 12 }}
            onPress={() => onAddressSelect?.(item.address.label)}
          >
            <AppText text={item.address.label} size={16} />
          </TouchableOpacity>
        )
      }}
      ListEmptyComponent={<AppText text="Data Not Found" size={16} />}
    />
  )
}
