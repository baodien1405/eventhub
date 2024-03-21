import React from 'react'
import { Modal, View } from 'react-native'

import { LocationFilters } from '@/components'
import { LocationPayload } from '@/models'

interface LocationModalProps {
  visible: boolean
  onClose?: () => void
  onSelect?: () => void
}

export const LocationModal = ({ visible, onClose }: LocationModalProps) => {
  const handleFiltersChange = (payload: LocationPayload) => {
    console.log('🚀 ~ LocationModal ~ payload:', payload)
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
      </View>
    </Modal>
  )
}
