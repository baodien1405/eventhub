import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native'
import React from 'react'
import { ArrowLeft, ArrowRight } from 'iconsax-react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

import { IMAGES } from '@/assets/images'
import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { AppButton, AppText, AvatarGroup, Row, Section } from '@/components'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { EventCalendarSVG, EventLocationSVG } from '@/assets/svg'
import { globalStyles } from '@/styles'

export const EventDetailsScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={IMAGES.coverEventDetails}
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
          <AppText
            text="International Band Music Concert"
            size={35}
            styles={{ marginBottom: 18 }}
          />

          <Row justify="flex-start" styles={{ marginBottom: 16 }}>
            <View style={styles.iconContainer}>
              <EventCalendarSVG />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <AppText text="14 December, 2021" size={16} font={FONT_FAMILIES.medium} />

              <AppText text="Tuesday, 4:00PM - 9:00PM" size={12} />
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
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww'
                }}
                resizeMode="cover"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12
                }}
              />

              <View style={{ marginLeft: 14 }}>
                <AppText text="Ashfak Sayem" size={15} />
                <AppText text="Tuesday, 4:00PM - 9:00PM" size={12} />
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
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis tempore repellat sint modi culpa officiis facere voluptatem expedita iure, et pariatur asperiores neque. Quam pariatur dicta nulla reiciendis aspernatur quia et pariatur asperiores neque. Quam pariatur dicta nulla reiciendis aspernatur quia."
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
            text="Buy Ticket $120"
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
  }
})
