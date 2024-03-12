import { Image } from 'react-native-image-crop-picker'

export interface Event {
  title: string
  description: string
  startAt: Date
  endAt: Date
  date: Date
  inviteUsers: string[]
  thumbnail: null | {
    file: Image
    previewUrl: string
  }
}
