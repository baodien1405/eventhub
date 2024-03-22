import React, { useState } from 'react'
import { FlatList, Modal, View } from 'react-native'

import { AppText, LocationFilters } from '@/components'
import { LocationPayload } from '@/models'
import { getErrorMessage } from '@/utils'
import { Toast } from 'toastify-react-native'
import { locationApi } from '@/api'

interface LocationModalProps {
  visible: boolean
  onClose?: () => void
  onSelect?: () => void
}

export const LocationModal = ({ visible, onClose }: LocationModalProps) => {
  const [locationList, setLocationList] = useState<any>([])

  const handleFiltersChange = async (payload: LocationPayload) => {
    try {
      if (!payload.search) setLocationList([])

      const response = await locationApi.getLocationList({
        q: payload.search,
        limit: 10
      })

      setLocationList(response.data?.items || [])
    } catch (error) {
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
    }
  }

  return (
    <Modal visible={visible} style={{ flex: 1 }} animationType="fade">
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 52
        }}
      >
        <LocationFilters onSubmit={handleFiltersChange} onClose={onClose} />

        <View style={{ marginTop: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={locationList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <AppText text={item.address.label} size={16} />
            }}
            ListEmptyComponent={<AppText text="Data Not Found" size={16} />}
          />
        </View>
      </View>
    </Modal>
  )
}
