import { Image } from 'react-native-image-crop-picker'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EventStackNavigatorParamList } from '@/models'

export type EventDetailsScreenProps = NativeStackScreenProps<
  EventStackNavigatorParamList,
  'EventDetailsScreen'
>

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
  event_author_id: string
}

export interface EventPayload extends Event {
  event_thumbnail: null | {
    file: Image | null
    previewUrl: string
  }
}
