import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { AppText, LocationModal, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'

type LocationPickerFieldProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  name: Path<T>
  control: Control<T>
}

export function LocationPickerField<T extends FieldValues>({
  label,
  placeholder,
  name,
  control
}: LocationPickerFieldProps<T>) {
  const [showModal, setShowModal] = useState(false)

  const {
    field: { onChange, value }
  } = useController({
    name,
    control
  })

  const handleSelectAddress = (address: string) => {
    onChange(address)
  }

  return (
    <View style={styles.container}>
      {label && <AppText text={label} styles={styles.label} />}
      <Row
        styles={[
          globalStyles.inputContainer,
          {
            padding: 8,
            paddingRight: 18,
            maxHeight: 60
          }
        ]}
        onPress={() => setShowModal(true)}
      >
        <Row>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 12,
              backgroundColor: 'rgba(86, 105, 255, 0.15)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Location size={15} color={COLORS.primary} />
            </View>
          </View>

          {value ? (
            <AppText text={value} color={COLORS.text4} styles={{ marginLeft: 18 }} />
          ) : (
            <AppText text={placeholder} color={COLORS.gray4} styles={{ marginLeft: 18 }} />
          )}
        </Row>

        <ArrowRight2 size={20} color={COLORS.primary} />
      </Row>

      <LocationModal
        visible={showModal}
        onSelect={handleSelectAddress}
        onClose={() => setShowModal(false)}
      />
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
  }
})
