import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { Toast } from 'toastify-react-native'
import Geocoder from 'react-native-geocoding'

import { APP } from '@/constants'

interface LocationMapViewProps {
  address: string
}

Geocoder.init(process.env.API_KEY_GOOGLE_MAP as string)

export const LocationMapView = ({ address }: LocationMapViewProps) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    Geocoder.from(address)
      .then((position) => {
        const location = position.results[0].geometry.location

        if (location) {
          setCurrentLocation({
            latitude: location.lat,
            longitude: location.lng
          })
        }
      })
      .catch((error) => console.error(error))
  }, [address])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        if (position.coords) {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        }
      },
      (error: any) => Toast.error(error.message, 'top'),
      {}
    )
  }, [])

  return (
    <MapView
      style={{ width: APP.sizes.WIDTH, height: 500, marginVertical: 40, zIndex: -1 }}
      showsMyLocationButton
      showsUserLocation
      mapType="standard"
      region={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.015
      }}
    />
  )
}
