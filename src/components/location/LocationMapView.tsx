import Geolocation from '@react-native-community/geolocation'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Toast } from 'toastify-react-native'
import { StyleProp, ViewStyle } from 'react-native'

import { Event, Position } from '@/models'
import { MarkerContent } from '@/components/map'

interface LocationMapViewProps {
  nearByEventList?: Array<Event>
  currentLocation: Position
  style?: StyleProp<ViewStyle>
  onMapPress: (location: Position) => void
}

export const LocationMapView = ({
  nearByEventList = [],
  currentLocation,
  style,
  onMapPress
}: LocationMapViewProps) => {
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
    >
      {nearByEventList.map((event) => (
        <Marker
          key={event._id}
          title={event.event_title}
          description={event.event_description}
          coordinate={{
            latitude: event.event_position.lat,
            longitude: event.event_position.lng
          }}
        >
          <MarkerContent category={event.event_category} onPress={() => {}} />
        </Marker>
      ))}
    </MapView>
  )
}
