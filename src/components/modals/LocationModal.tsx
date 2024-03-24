import React, { useCallback, useState } from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Toast } from 'toastify-react-native'
import Geocoder from 'react-native-geocoding'

import { locationApi } from '@/api'
import { AppButton, LocationFilters, LocationList, LocationMapView } from '@/components'
import { EventLocation, LocationPayload, Position } from '@/models'
import { getErrorMessage } from '@/utils'
import { COLORS, FONT_FAMILIES } from '@/constants'

interface LocationModalProps {
  visible: boolean
  onClose?: () => void
  onSelect?: (location: EventLocation) => void
}

Geocoder.init(process.env.API_KEY_GOOGLE_MAP as string)

export const LocationModal = ({ visible, onSelect, onClose }: LocationModalProps) => {
  const [locationList, setLocationList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')
  const [currentLocation, setCurrentLocation] = useState<Position>({
    lat: 0,
    lng: 0
  })

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

  const handleMapPress = useCallback(async ({ lat, lng }: Position) => {
    setCurrentLocation({
      lat,
      lng
    })

    try {
      const response = await locationApi.getLocation(lat, lng)
      setSelectedAddress(response.data?.items?.[0].title)
    } catch (error) {
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
    }
  }, [])

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

        <LocationMapView
          address={selectedAddress}
          currentLocation={currentLocation}
          onMapPress={handleMapPress}
        />

        <AppButton
          styles={{
            position: 'absolute',
            bottom: 0
          }}
          text="Confirm"
          type="primary"
          onPress={() => {
            onSelect?.({
              event_address: selectedAddress,
              event_position: currentLocation
            })
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
