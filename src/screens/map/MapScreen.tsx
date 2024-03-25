import React, { useCallback, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import { CategoryList, InputField, LocationMapView, Row, Space } from '@/components'
import { Position } from '@/models'
import { APP, COLORS } from '@/constants'
import { useForm } from 'react-hook-form'
import { ArrowLeft2 } from 'iconsax-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { globalStyles } from '@/styles'

export const MapScreen = ({ navigation }: any) => {
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

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <LocationMapView
        currentLocation={currentLocation}
        onMapPress={handleMapPress}
        style={{
          width: APP.sizes.WIDTH,
          height: APP.sizes.HEIGHT
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 48
        }}
      >
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

          <View style={[styles.wrapperIcon, globalStyles.shadow]}>
            <MaterialIcons name="my-location" size={24} color={COLORS.primary} />
          </View>
        </Row>

        <Space height={20} />

        <CategoryList isFill={false} />
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
  }
})
