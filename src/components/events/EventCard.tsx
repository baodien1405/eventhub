import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import { AppText, AvatarGroup, Row } from '@/components'
import { globalStyles } from '@/styles'
import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { Location } from 'iconsax-react-native'

export const EventCard = () => {
  return (
    <View style={[styles.container, globalStyles.shadow]}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1709377060397-14c021810ebc?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8'
        }}
        style={{ flex: 1, height: 130, marginBottom: 12 }}
        imageStyle={{ flex: 1, borderRadius: 18 }}
      >
        <View style={styles.eventDate}>
          <AppText
            text="10"
            size={18}
            font={FONT_FAMILIES.bold}
            color={COLORS.error}
            styles={{ marginTop: 4 }}
          />
          <AppText
            text="June"
            size={10}
            color={COLORS.error}
            font={FONT_FAMILIES.medium}
            styles={{ textTransform: 'uppercase' }}
          />
        </View>

        <View style={styles.badge}>
          <FontAwesome6 solid name="bookmark" size={14} color={COLORS.error} />
        </View>
      </ImageBackground>

      <AppText
        text="International Band Mu..."
        size={18}
        color="#000"
        numberOfLines={1}
        font={FONT_FAMILIES.medium}
      />

      <AvatarGroup />

      <Row styles={{ marginBottom: 6 }}>
        <Location variant="Bold" size={16} color={COLORS.gray4} />
        <AppText
          text="36 Guild Street London, UK"
          styles={{ marginRight: 5 }}
          color="#2B2849"
          size={13}
          numberOfLines={1}
        />
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 18,
    width: APP.sizes.WIDTH * 0.6,
    backgroundColor: COLORS.white,
    marginRight: 16,
    marginBottom: 16
  },
  eventDate: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    left: 8
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 8
  }
})
