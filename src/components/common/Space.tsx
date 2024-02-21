import React from 'react'
import { View } from 'react-native'

interface SpaceProps {
  width?: number
  height?: number
}

export const Space = ({ width, height }: SpaceProps) => {
  return <View style={{ width, height }} />
}
