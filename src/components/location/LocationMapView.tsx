import Geolocation from '@react-native-community/geolocation'
import React, { useEffect } from 'react'
import MapView from 'react-native-maps'
import { Toast } from 'toastify-react-native'
import { StyleProp, ViewStyle } from 'react-native'

import { Position } from '@/models'

interface LocationMapViewProps {
  currentLocation: Position
  style?: StyleProp<ViewStyle>
  onMapPress: (location: Position) => void
}

export const LocationMapView = ({ currentLocation, style, onMapPress }: LocationMapViewProps) => {
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
      style={style}
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
