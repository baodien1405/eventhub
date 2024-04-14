import { Image } from 'react-native-image-crop-picker'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EventStackNavigatorParamList, ListParams, User } from '@/models'

export type EventDetailsScreenProps = NativeStackScreenProps<
  EventStackNavigatorParamList,
  'EventDetailsScreen'
>

export interface EventLocation {
  event_address: string
  event_position: {
    lat: number
    lng: number
  }
}

export interface Event {
  _id: string
  event_title: string
  event_description: string
  event_start_at: Date
  event_end_at: Date
  event_date: Date
  event_invite_users: string[]
  event_thumbnail_url: string
  event_category: string
  event_price: string | number
  event_author: User
  event_location_name: string
  event_address: string
  event_position: {
    lat: number
    lng: number
  }
}

export interface EventPayload extends Event {
  event_thumbnail: null | {
    file: Image | null
    previewUrl: string
  }
  event_location: EventLocation
}

export interface EventListParams extends ListParams {
  lat: number
  lng: number
  distance: number
}
