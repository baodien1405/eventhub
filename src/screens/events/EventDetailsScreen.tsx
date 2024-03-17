import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native'
import React from 'react'
import { ArrowLeft, ArrowRight, Edit2 } from 'iconsax-react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import dayjs from 'dayjs'

import { APP, COLORS, FONT_FAMILIES, FORMAT_TYPES, SCREENS } from '@/constants'
import { AppButton, AppText, AvatarGroup, LoadingModal, Row, Section } from '@/components'
import { EventCalendarSVG, EventLocationSVG } from '@/assets/svg'
import { globalStyles } from '@/styles'
import { EventDetailsScreenProps } from '@/models'
import { useEventDetails } from '@/hooks'

export const EventDetailsScreen = ({ navigation, route }: EventDetailsScreenProps) => {
  const eventId = route.params.eventId
  const { data, isLoading, isError } = useEventDetails(eventId)

  if (isLoading) {
    return <LoadingModal visible={isLoading} />
  }

  if (isError) {
    return <AppText text="Error fetching event details." />
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: data?.metadata.event_thumbnail_url
        }}
        style={{ height: 244, zIndex: 100 }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']}>
          <Row
            styles={{
              paddingTop: 40,
              paddingHorizontal: 24
            }}
          >
            <TouchableOpacity
              style={{ width: 48, height: 48, justifyContent: 'center' }}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={28} color={COLORS.white} />
            </TouchableOpacity>

            <AppText
              text="Event Details"
              color={COLORS.white}
              size={24}
              font={FONT_FAMILIES.medium}
            />

            <View style={styles.bookmark}>
              <FontAwesome6 solid name="bookmark" size={15} color={COLORS.white} />
            </View>
          </Row>
        </LinearGradient>

        <View style={[styles.wrapperInvite, globalStyles.shadow]}>
          <Row justify="space-between" styles={styles.inviteContent}>
            <View style={{ flex: 1 }}>
              <AvatarGroup avatarSize={34} textStyle={{ fontSize: 15 }} />
            </View>

            <AppButton
              text="Invite"
              textColor={COLORS.white}
              textStyles={{ fontSize: 12, fontFamily: FONT_FAMILIES.regular }}
              styles={styles.inviteBtn}
            />
          </Row>
        </View>
      </ImageBackground>

      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Section styles={{ paddingHorizontal: 24, paddingTop: 50 }}>
          <Row justify="space-between" styles={{ alignItems: 'flex-start' }}>
            <AppText
              text={data?.metadata.event_title}
              size={35}
              styles={{ marginBottom: 18, marginRight: 4 }}
              numberOfLines={3}
            />

            <TouchableOpacity
              style={styles.editContainer}
              onPress={() =>
                (navigation as any).navigate(SCREENS.ADD_EDIT_EVENT_SCREEN, {
                  eventId: eventId
                })
              }
            >
              <Edit2 size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </Row>

          <Row justify="flex-start" styles={{ marginBottom: 16 }}>
            <View style={styles.iconContainer}>
              <EventCalendarSVG />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <AppText
                text={dayjs(data?.metadata.event_date).format(FORMAT_TYPES.DD_MMMM_YYYY)}
                size={16}
                font={FONT_FAMILIES.medium}
              />

              <AppText
                text={`${dayjs(data?.metadata.event_date).format(FORMAT_TYPES.dddd)}, ${dayjs(
                  data?.metadata.event_start_at
                ).format('h:mm A')} - ${dayjs(data?.metadata.event_end_at).format('h:mm A')}`}
                size={12}
              />
            </View>
          </Row>

          <Row justify="flex-start" styles={{ marginBottom: 24 }}>
            <View style={styles.iconContainer}>
              <EventLocationSVG />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <AppText text="14 December, 2021" size={16} font={FONT_FAMILIES.medium} />

              <AppText text="Tuesday, 4:00PM - 9:00PM" size={12} />
            </View>
          </Row>

          <Row justify="space-between" styles={{ marginBottom: 24 }}>
            <Row styles={{ flex: 1 }} justify="flex-start">
              {data?.metadata.event_author.avatar ? (
                <Image
                  source={{
                    uri: data?.metadata.event_author.avatar
                  }}
                  resizeMode="cover"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray2
                  }}
                >
                  <AppText
                    flex={0}
                    text={data?.metadata.event_author.fullName.charAt(0)}
                    font={FONT_FAMILIES.medium}
                    size={18}
                    color={COLORS.white}
                  />
                </View>
              )}

              <View style={{ marginLeft: 14 }}>
                <AppText text={data?.metadata.event_author.fullName} size={15} />
                <AppText text="Organizer" size={12} />
              </View>
            </Row>

            <AppButton
              text="Follow"
              textColor={COLORS.primary}
              color="rgba(86, 105, 255, 0.12)"
              styles={{
                maxHeight: 28,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 7,
                width: 67
              }}
            />
          </Row>

          <AppText
            text="About Event"
            size={18}
            font={FONT_FAMILIES.medium}
            styles={{ lineHeight: 34, marginBottom: 8 }}
          />

          <AppText
            text={data?.metadata.event_description}
            size={15}
            font={FONT_FAMILIES.regular}
            styles={{ lineHeight: 25 }}
          />
        </Section>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,

          width: '100%'
        }}
      >
        <LinearGradient colors={['rgba(256, 256, 256, 0.75)', 'rgba(256, 256, 256, 1)']}>
          <AppButton
            text={`Buy Ticket $${data?.metadata.event_price}`}
            loading={false}
            textColor={COLORS.white}
            textStyles={{
              fontSize: 16,
              fontFamily: FONT_FAMILIES.medium,
              fontWeight: '400',
              textTransform: 'uppercase'
            }}
            suffixIcon={
              <Row styles={globalStyles.iconContainer}>
                <ArrowRight size={20} color={COLORS.white} />
              </Row>
            }
            styles={{ width: 271, marginBottom: 30 }}
            onPress={() => {}}
          />
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bookmark: {
    width: 36,
    height: 36,
    borderRadius: 7,
    backgroundColor: 'rgba(256, 256, 256, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperInvite: {
    alignItems: 'center',
    position: 'absolute',
    bottom: -24,
    left: 0,
    right: 0
  },
  inviteContent: {
    width: APP.sizes.WIDTH * 0.7,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    paddingHorizontal: 14
  },
  inviteBtn: {
    maxHeight: 28,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 7,
    width: 67
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(86, 105, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editContainer: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: 'rgba(86, 105, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})
