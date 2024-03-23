import { useForm } from 'react-hook-form'
import debounce from 'lodash.debounce'
import { View } from 'react-native'
import React, { useEffect } from 'react'
import { SearchNormal1 } from 'iconsax-react-native'

import { AppButton, InputField, Row } from '@/components'
import { COLORS } from '@/constants'
import { LocationPayload } from '@/models'

interface LocationFiltersProps {
  address?: string
  onClose?: () => void
  onSubmit?: (payload: LocationPayload) => void
}

export const LocationFilters = ({ address, onClose, onSubmit }: LocationFiltersProps) => {
  const { control, handleSubmit, setValue } = useForm<LocationPayload>()

  useEffect(() => {
    if (address) {
      setValue('search', address)
    }
  }, [address, setValue])

  const handleFiltersSubmit = (formValues: LocationPayload) => {
    onSubmit?.(formValues)
  }

  const debounceSearchChange = debounce(handleSubmit(handleFiltersSubmit), 350)

  return (
    <Row>
      <View style={{ flex: 1, marginRight: 12 }}>
        <InputField
          name="search"
          control={control}
          placeholder="Search"
          prefix={<SearchNormal1 variant="TwoTone" size={24} color={COLORS.gray} />}
          allowClear
          inputWrapperStyle={{ marginBottom: 0 }}
          onChangeText={() => debounceSearchChange()}
        />
      </View>
      <AppButton text="Cancel" type="link" onPress={onClose} />
    </Row>
  )
}
