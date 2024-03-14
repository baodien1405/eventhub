import { DrawerActions } from '@react-navigation/native'
import { Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import React from 'react'
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import { IMAGES } from '@/assets/images'
import { MenuSVG } from '@/assets/svg'
import {
  AppText,
  CategoryList,
  Circle,
  CurrentLocation,
  Row,
  Space,
  TabBar,
  Tag,
  EventList
} from '@/components'
import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { ExploreScreenProps } from '@/models'
import { globalStyles } from '@/styles'

export const ExploreScreen = ({ navigation }: ExploreScreenProps) => {
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Row>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MenuSVG />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <CurrentLocation />
          </View>

          <Circle size={36} color="#5D56F3">
            <View>
              <Notification size={18} color={COLORS.white} />
              <View style={styles.dot} />
            </View>
          </Circle>
        </Row>

        <Space height={20} />

        <Row justify="flex-start">
          <Row>
            <SearchNormal1 variant="TwoTone" size={24} color={COLORS.white} />
            <View style={styles.separator} />
            <AppText text="Search..." flex={1} size={20} color="rgba(256, 256, 256, 0.3)" />
            <Tag
              label="Filters"
              bgColor="#5D56F3"
              icon={
                <View style={styles.filterIcon}>
                  <Sort size={20} color={COLORS.primary} />
                </View>
              }
              textStyle={{
                fontSize: 12,
                color: COLORS.white
              }}
            />
          </Row>
        </Row>

        <View style={styles.wrapperCategoryList}>
          <CategoryList />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <TabBar title="Upcoming Events" onPress={() => {}} />

        <View style={{ marginTop: 10, marginBottom: 14 }}>
          <EventList />
        </View>

        <View style={styles.invite}>
          <ImageBackground
            source={IMAGES.invite}
            style={{ flex: 1, height: 127, paddingTop: 13, paddingLeft: 18 }}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
              backgroundColor: 'rgba(0, 248, 255, 0.2)'
            }}
          >
            <AppText
              text="Invite your friends"
              size={18}
              font={FONT_FAMILIES.medium}
              styles={{ lineHeight: 34 }}
              flex={0}
            />
            <AppText
              text="Get $20 for ticket"
              size={13}
              color="#484D70"
              flex={0}
              styles={{ marginBottom: 13 }}
            />
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <AppText
                text="INVITE"
                size={12}
                color={COLORS.white}
                font={FONT_FAMILIES.medium}
                flex={0}
                styles={{ lineHeight: 23 }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <TabBar title="Nearby You" onPress={() => {}} />

        <View style={{ marginTop: 10, marginBottom: 14 }}>
          <EventList />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#4A43EC',
    height: Platform.OS === 'android' ? 180 : 200,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    zIndex: 100
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: '#02E9FE',
    borderWidth: 2,
    borderColor: '#524CE0',
    position: 'absolute',
    top: -2,
    right: -1
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#7974E7',
    marginLeft: 10,
    marginRight: 7
  },
  filterIcon: {
    backgroundColor: '#A29EF0',
    borderRadius: 100,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperCategoryList: {
    position: 'absolute',
    bottom: -6,
    left: 24,
    right: 0
  },
  invite: {
    borderRadius: 12,
    width: APP.sizes.WIDTH - 48,
    marginBottom: 24
  },
  button: {
    backgroundColor: '#00F8FF',
    width: 72,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
})
