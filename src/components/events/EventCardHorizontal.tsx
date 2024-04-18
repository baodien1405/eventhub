import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Location } from 'iconsax-react-native'
import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import dayjs from 'dayjs'

import { AppText, Row } from '@/components'
import { APP, COLORS, FONT_FAMILIES, FORMAT_TYPES, SCREENS } from '@/constants'
import { Event } from '@/models'
import { globalStyles } from '@/styles'

interface EventCardHorizontalProps {
  event: Event
}

export const EventCardHorizontal = ({ event }: EventCardHorizontalProps) => {
  const navigation = useNavigation<NavigationProp<any>>()

  return (
    <TouchableOpacity
      style={[styles.container, globalStyles.shadow]}
      onPress={() =>
        navigation.navigate('Events', {
          screen: SCREENS.EVENT_DETAILS_SCREEN,
          params: {
            eventId: event._id
          }
        })
      }
    >
      <Row>
        <ImageBackground
          source={{ uri: event.event_thumbnail_url }}
          style={{ height: 92, width: 80 }}
          imageStyle={{ borderRadius: 10 }}
        />

        <View style={{ flex: 1, marginLeft: 12, alignItems: 'stretch' }}>
          <Row justify="space-between">
            <AppText
              text={dayjs(event.event_date).format(FORMAT_TYPES.LLLL)}
              size={13}
              color={COLORS.primary}
              numberOfLines={1}
              font={FONT_FAMILIES.regular}
              flex={0}
              styles={{ marginBottom: 4 }}
            />

            <View style={styles.badge}>
              <FontAwesome6 solid name="bookmark" size={14} color={COLORS.error} />
            </View>
          </Row>

          <AppText
            text={event.event_title}
            size={18}
            color="#000"
            numberOfLines={2}
            font={FONT_FAMILIES.medium}
            flex={0}
            styles={{ marginBottom: 8 }}
          />

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
      </Row>
    </TouchableOpacity>
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
  badge: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
