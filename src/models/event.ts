import { Image } from 'react-native-image-crop-picker'

export interface Event {
  _id: string
  title: string
  description: string
  startAt: Date
  endAt: Date
  date: Date
  inviteUsers: string[]
  thumbnailUrl: string
  category: string
  price: number
}

export interface EventPayload extends Event {
  thumbnail: null | {
    file: Image | null
    previewUrl: string
  }
}
