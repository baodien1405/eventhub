import { ArrowDown2, Notification, SearchNormal1, Sort } from 'iconsax-react-native'
import React from 'react'
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import { DrawerActions } from '@react-navigation/native'

import { AppText, CategoryList, Circle, Row, Space, TabBar, Tag } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'
import { ExploreScreenProps } from '@/models'
import { MenuSVG } from '@/assets/svg'

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
            <Row>
              <AppText
                text="Current Location"
                flex={0}
                color={COLORS.white}
                styles={{ opacity: 0.7 }}
                size={12}
              />
              <ArrowDown2 variant="Bold" size={14} color={COLORS.white2} />
            </Row>

            <AppText
              text="New York, USA"
              size={13}
              flex={0}
              color="#F4F4FE"
              font={FONT_FAMILIES.medium}
            />
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

      <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 28 }}>
        <TabBar title="Upcoming Events" onPress={() => {}} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#4A43EC',
    height: 179,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33
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
  }
})
