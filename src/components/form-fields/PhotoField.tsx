import { Control, FieldValues, Path, useController } from 'react-hook-form'
import React, { useRef } from 'react'
import ImageCropPicker, { Options } from 'react-native-image-crop-picker'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Modalize } from 'react-native-modalize'
import { Camera, Image as ImageIcon } from 'iconsax-react-native'

import { AppText, Row, Space } from '@/components'
import { COLORS, DEFAULT_THUMBNAIL_URL, FONT_FAMILIES } from '@/constants'

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
}

export function PhotoField<T extends FieldValues>({ name, control, label }: PhotoFieldProps<T>) {
  const modalizeRef = useRef<Modalize>()

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const previewUrl = value?.previewUrl || DEFAULT_THUMBNAIL_URL
  const options: Options = {
    cropping: true,
    mediaType: 'photo'
  }

  const handleImageFromLibrary = () => {
    ImageCropPicker.openPicker(options).then((res) => {
      onChange({
        file: res,
        previewUrl: res.path
      })
    })

    modalizeRef.current?.close()
  }

  const handleImageFromCamera = () => {
    ImageCropPicker.openCamera(options).then((res) => {
      onChange({
        file: res,
        previewUrl: res.path
      })
    })

    modalizeRef.current?.close()
  }

  const imageOptionList = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={COLORS.text} />,
      onPress: handleImageFromCamera
    },
    {
      key: 'library',
      title: 'From library',
      icon: <ImageIcon size={22} color={COLORS.text} />,
      onPress: handleImageFromLibrary
    }
  ]

  return (
    <View style={[styles.container]}>
      {label && <AppText text={label} styles={styles.label} />}

      <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
        <Image
          source={{ uri: previewUrl }}
          resizeMode="cover"
          style={{
            height: 180,
            borderRadius: 12
          }}
        />
      </TouchableOpacity>

      <Portal>
        <Modalize adjustToContentHeight ref={modalizeRef} handlePosition="inside">
          <View style={{ marginVertical: 30, paddingHorizontal: 24 }}>
            {imageOptionList.map((option) => (
              <Row styles={{ marginBottom: 20 }} key={option.key} onPress={option.onPress}>
                {option.icon}
                <Space width={12} />
                <AppText text={option.title} flex={1} font={FONT_FAMILIES.medium} />
              </Row>
            ))}
          </View>
        </Modalize>
      </Portal>

      {error?.message && (
        <AppText text={error.message} color={COLORS.error} flex={0} styles={styles.errorMessage} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: FONT_FAMILIES.medium,
    lineHeight: 34
  },
  errorMessage: {
    marginTop: 8
  }
})
