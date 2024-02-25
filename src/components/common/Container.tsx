import React, { ReactNode } from 'react'
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'iconsax-react-native'

import { IMAGES } from '@/assets/images'
import { globalStyles } from '@/styles'
import { AppText, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'

interface ContainerProps {
  isImageBackground?: boolean
  isScroll?: boolean
  title?: string
  children: ReactNode
  back?: boolean
}

export const Container = ({
  isImageBackground,
  isScroll,
  children,
  title,
  back
}: ContainerProps) => {
  const navigation = useNavigation()

  const renderContent = () => {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 }}>
        {(title || back) && (
          <Row
            justify="flex-start"
            styles={{
              paddingHorizontal: 28,
              paddingTop: 10,
              paddingBottom: 20,
              minWidth: 48,
              minHeight: 48
            }}
          >
            {back && (
              <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={COLORS.text} />
              </TouchableOpacity>
            )}

            {title && <AppText text={title} font={FONT_FAMILIES.medium} size={16} />}
          </Row>
        )}

        {isScroll ? (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>{children}</View>
        )}
      </View>
    )
  }

  if (isImageBackground) {
    return (
      <ImageBackground
        source={IMAGES.splashBackground}
        style={{ flex: 1 }}
        imageStyle={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>
      </ImageBackground>
    )
  }
  return <SafeAreaView style={[globalStyles.container]}>{renderContent()}</SafeAreaView>
}
