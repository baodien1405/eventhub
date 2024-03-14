import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Location } from 'iconsax-react-native'
import dayjs from 'dayjs'

import { AppText, AvatarGroup, Row } from '@/components'
import { globalStyles } from '@/styles'
import { APP, COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { Event } from '@/models'

interface EventCardProps {
  event: Event
}

export const EventCard = ({ event }: EventCardProps) => {
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
      <ImageBackground
        source={{
          uri: event.event_thumbnail_url
        }}
        style={{ flex: 1, height: 130, marginBottom: 12 }}
        imageStyle={{ flex: 1, borderRadius: 18 }}
      >
        <View style={styles.eventDate}>
          <AppText
            text={dayjs(event.event_date).format('DD')}
            size={18}
            font={FONT_FAMILIES.bold}
            color={COLORS.error}
            styles={{ marginTop: 4 }}
          />
          <AppText
            text={dayjs(event.event_date).format('MMMM')}
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
        text={event.event_title}
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
