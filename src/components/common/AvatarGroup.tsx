import React from 'react'
import { Image, TextStyle } from 'react-native'
import { StyleProp } from 'react-native'

import { AppText, Row, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'

interface AvatarGroupProps {
  avatarSize?: number
  textStyle?: StyleProp<TextStyle>
}

export const AvatarGroup = ({ avatarSize = 24, textStyle }: AvatarGroupProps) => {
  return (
    <Row justify="flex-start" styles={{ marginVertical: 12 }}>
      {Array.from({ length: 3 }).map((item, index) => {
        return (
          <Image
            key={`img${index}`}
            source={{
              uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww'
            }}
            style={{
              height: avatarSize,
              width: avatarSize,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: COLORS.white,
              marginRight: -8
            }}
          />
        )
      })}

      <Space width={12} />

      <AppText
        text="+20 Going"
        size={12}
        font={FONT_FAMILIES.medium}
        color="#3F38DD"
        styles={textStyle}
      />
    </Row>
  )
}
