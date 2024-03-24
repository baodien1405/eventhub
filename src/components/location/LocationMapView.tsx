import Geolocation from '@react-native-community/geolocation'
import React, { useEffect } from 'react'
import Geocoder from 'react-native-geocoding'
import MapView from 'react-native-maps'
import { Toast } from 'toastify-react-native'

import { APP } from '@/constants'
import { Position } from '@/models'

interface LocationMapViewProps {
  address: string
  currentLocation: Position
  onMapPress: (location: Position) => void
}

export const LocationMapView = ({ address, currentLocation, onMapPress }: LocationMapViewProps) => {
  useEffect(() => {
    Geocoder.from(address)
      .then((position) => {
        const location = position.results[0].geometry.location

        if (location) {
          onMapPress({
            lat: location.lat,
            lng: location.lng
          })
        }
      })
      .catch((error) => {
        Toast.error(error.message, 'top')
      })
  }, [address, onMapPress])

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        if (position.coords) {
          onMapPress({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      },
      (error: any) => Toast.error(error.message, 'top'),
      {}
    )
  }, [onMapPress])

  return (
    <MapView
      showsMyLocationButton
      showsUserLocation
      mapType="standard"
      style={{
        width: APP.sizes.WIDTH,
        height: APP.sizes.HEIGHT - 220,
        marginVertical: 40,
        zIndex: -1
      }}
      region={{
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.015
      }}
      onPress={(event) =>
        onMapPress({
          lat: event.nativeEvent.coordinate.latitude,
          lng: event.nativeEvent.coordinate.longitude
        })
      }
    />
  )
}
