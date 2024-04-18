import React, { useCallback, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { ArrowLeft2 } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Toast } from 'toastify-react-native'

import {
  CategoryList,
  EventCardHorizontal,
  InputField,
  LocationMapView,
  Row,
  Space
} from '@/components'
import { Event, Position } from '@/models'
import { APP, COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import { eventApi } from '@/api'
import { getErrorMessage } from '@/utils'

export const MapScreen = ({ navigation }: any) => {
  const [eventList, setEventList] = useState<Array<Event>>([])
  const [currentLocation, setCurrentLocation] = useState<Position>({
    lat: 0,
    lng: 0
  })

  const { control } = useForm<any>()

  const handleMapPress = useCallback(async ({ lat, lng }: Position) => {
    setCurrentLocation({
      lat,
      lng
    })
  }, [])

  const handleGetNearbyEventList = async () => {
    try {
      const response = await eventApi.getAll({
        page: 1,
        limit: 50,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        distance: 5
      })
      setEventList(response.metadata?.results || [])
    } catch (error) {
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <LocationMapView
        nearByEventList={eventList}
        currentLocation={currentLocation}
        onMapPress={handleMapPress}
        style={{
          width: APP.sizes.WIDTH,
          height: APP.sizes.HEIGHT
        }}
      />

      <View style={styles.headingContainer}>
        <Row>
          <View style={[{ flex: 1 }, globalStyles.shadow]}>
            <InputField
              name="search"
              control={control}
              placeholder="Search event..."
              allowClear
              inputWrapperStyle={styles.input}
              prefix={
                <ArrowLeft2
                  size={24}
                  color={COLORS.text}
                  onPress={() =>
                    navigation.navigate('Explore', {
                      screen: 'ExploreScreen'
                    })
                  }
                />
              }
            />
          </View>

          <Space width={12} />

          <TouchableOpacity onPress={handleGetNearbyEventList}>
            <View style={[styles.wrapperIcon, globalStyles.shadow]}>
              <MaterialIcons name="my-location" size={24} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </Row>

        <Space height={20} />

        <CategoryList isFill={false} />
      </View>

      <View style={styles.footerContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={eventList}
          renderItem={({ item }) => <EventCardHorizontal key={item._id} event={item} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 0
  },
  wrapperIcon: {
    height: 54,
    width: 54,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    padding: 20,
    paddingTop: 48
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
})
