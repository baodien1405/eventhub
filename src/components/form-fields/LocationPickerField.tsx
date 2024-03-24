import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { AppText, LocationModal, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { globalStyles } from '@/styles'
import { EventLocation } from '@/models'

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
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const handleSelectAddress = (location: EventLocation) => {
    onChange(location)
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
            maxHeight: 60,
            borderWidth: 0.5,
            borderColor: error?.message ? COLORS.error : COLORS.gray2
          }
        ]}
        onPress={() => setShowModal(true)}
      >
        <Row>
          <View style={styles.wrapperIcon}>
            <View style={styles.contentIcon}>
              <Location size={15} color={COLORS.primary} />
            </View>
          </View>

          {value?.event_address ? (
            <AppText
              text={value.event_address}
              color={COLORS.text4}
              styles={{ marginLeft: 18 }}
              numberOfLines={1}
            />
          ) : (
            <AppText text={placeholder} color={COLORS.gray4} styles={{ marginLeft: 18 }} />
          )}
        </Row>

        <ArrowRight2 size={20} color={COLORS.primary} />
      </Row>

      {error?.message && (
        <AppText text={error.message} color={COLORS.error} flex={0} styles={styles.errorMessage} />
      )}

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
  },
  errorMessage: {
    marginTop: 8
  },
  wrapperIcon: {
    height: 45,
    width: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(86, 105, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentIcon: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
