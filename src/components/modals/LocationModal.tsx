import React, { useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Toast } from 'toastify-react-native'

import { locationApi } from '@/api'
import { AppButton, LocationFilters, LocationList, LocationMapView } from '@/components'
import { LocationPayload } from '@/models'
import { getErrorMessage } from '@/utils'
import { COLORS, FONT_FAMILIES } from '@/constants'

interface LocationModalProps {
  visible: boolean
  onClose?: () => void
  onSelect?: (address: string) => void
}

export const LocationModal = ({ visible, onSelect, onClose }: LocationModalProps) => {
  const [locationList, setLocationList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')

  const handleFiltersChange = async (payload: LocationPayload) => {
    try {
      if (!payload.search) setLocationList([])

      setIsLoading(true)
      const response = await locationApi.getLocationList({
        q: payload.search,
        limit: 20
      })
      setIsLoading(false)

      setLocationList(response.data?.items || [])
    } catch (error) {
      setIsLoading(false)
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
    }
  }

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address)
    setLocationList([])
  }

  return (
    <Modal visible={visible} style={{ flex: 1 }} animationType="fade">
      <View style={styles.modalContent}>
        <View style={styles.modalTop}>
          <LocationFilters
            address={selectedAddress}
            onSubmit={handleFiltersChange}
            onClose={onClose}
          />

          {locationList.length > 0 && (
            <View style={styles.wrapperList}>
              <LocationList
                loading={isLoading}
                locationList={locationList}
                onAddressSelect={handleAddressSelect}
              />
            </View>
          )}
        </View>

        <LocationMapView address={selectedAddress} />

        <AppButton
          text="Confirm"
          type="primary"
          onPress={() => {
            onSelect?.(selectedAddress)
            onClose?.()
          }}
          textColor={COLORS.white}
          textStyles={{
            fontFamily: FONT_FAMILIES.medium
          }}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    paddingVertical: 52
  },
  modalTop: {
    paddingHorizontal: 24
  },
  wrapperList: {
    position: 'absolute',
    top: 56,
    right: 24,
    left: 24,
    zIndex: 5,
    backgroundColor: COLORS.white,
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  }
})
