import { ArrowDown2 } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'

import { AppText, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { locationApi } from '@/api'
import { Location } from '@/models'
import { getErrorMessage } from '@/utils'
import { Toast } from 'toastify-react-native'

export const CurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>()

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        if (position.coords) {
          reverseGeoCode({
            lat: position.coords.latitude,
            long: position.coords.longitude
          })
        }
      },
      (error: any) => Toast.error(error.message, 'top'),
      {}
    )
  }, [])

  const reverseGeoCode = async ({ lat, long }: { lat: number; long: number }) => {
    try {
      const response = await locationApi.getLocation(lat, long)
      if (response?.data) {
        setCurrentLocation(response.data?.items?.[0])
      }
    } catch (error) {
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
    }
  }

  return (
    <>
      <Row>
        <AppText
          text="Current Location"
          flex={0}
          color={COLORS.white}
          styles={{ opacity: 0.7 }}
          size={12}
        />
        <ArrowDown2 variant="Bold" size={14} color={COLORS.white2} />
      </Row>

      <AppText
        text={`${currentLocation?.address.city}, ${currentLocation?.address.countryCode}`}
        size={13}
        flex={0}
        color="#F4F4FE"
        font={FONT_FAMILIES.medium}
      />
    </>
  )
}
