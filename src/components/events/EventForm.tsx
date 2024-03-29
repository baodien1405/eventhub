import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowRight, LocationAdd } from 'iconsax-react-native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import * as yup from 'yup'

import {
  AppButton,
  AppText,
  DatePickerField,
  DropdownField,
  InputField,
  LocationPickerField,
  PhotoField,
  Row,
  Section,
  SelectField,
  Space
} from '@/components'
import { COLORS, FONT_FAMILIES, FORMAT_TYPES } from '@/constants'
import { useEventSchema, useUserList } from '@/hooks'
import { EventPayload, Option } from '@/models'
import { globalStyles } from '@/styles'
import { uploadImageToStorageFirebase } from '@/utils'

interface EventFormProps {
  isAddSuccess?: boolean
  initialValues?: Partial<EventPayload>
  loading?: boolean
  onSubmit?: (payload: Partial<EventPayload>) => void
}

export function EventForm({ isAddSuccess, initialValues, loading, onSubmit }: EventFormProps) {
  const schema = useEventSchema({ initialValues })
  const [isLoadingUpload, setIsLoadingUpload] = useState(false)
  const { data } = useUserList()

  const { control, handleSubmit, reset } = useForm<Partial<EventPayload>>({
    defaultValues: {
      event_title: '',
      event_description: '',
      event_invite_users: [],
      event_thumbnail: initialValues?._id
        ? { file: null, previewUrl: initialValues.event_thumbnail_url }
        : null,
      ...initialValues,
      event_price: initialValues?.event_price ? String(initialValues.event_price) : '',
      event_location: {
        event_address: initialValues?.event_address,
        event_position: initialValues?.event_position
      }
    },
    resolver: yupResolver<yup.AnyObject>(schema)
  })

  useEffect(() => {
    if (isAddSuccess) {
      reset()
    }
  }, [isAddSuccess, reset])

  const inviteUserOptions: Option[] =
    data?.metadata.items.map((user) => ({
      label: user.fullName,
      value: user._id || ''
    })) || []

  const categoryOptions: Option[] = [
    {
      label: 'Sports',
      value: 'sports'
    },
    {
      label: 'Music',
      value: 'music'
    },
    {
      label: 'Food',
      value: 'food'
    },
    {
      label: 'Art',
      value: 'art'
    }
  ]

  const handleFormSubmit = async (formValues: Partial<EventPayload>) => {
    if (formValues.event_thumbnail?.file) {
      setIsLoadingUpload(true)
      const thumbnailUrl = await uploadImageToStorageFirebase(formValues.event_thumbnail?.file)
      setIsLoadingUpload(false)

      formValues.event_thumbnail_url = thumbnailUrl
      formValues.event_price = Number(formValues.event_price)
      formValues.event_address = formValues.event_location?.event_address
      formValues.event_position = formValues.event_location?.event_position

      delete formValues.event_thumbnail
      delete formValues.event_location
    }

    onSubmit?.(formValues)
  }

  return (
    <Section>
      <AppText
        text={initialValues?._id ? `Edit event #${initialValues._id}` : 'Add new event'}
        size={24}
        font={FONT_FAMILIES.medium}
        styles={{ marginBottom: 20, textAlign: 'center' }}
      />

      <PhotoField name="event_thumbnail" label="Thumbnail" control={control} />

      <InputField
        name="event_title"
        label="Title"
        control={control}
        placeholder="Enter a title"
        allowClear
      />

      <InputField
        name="event_description"
        label="Description"
        control={control}
        placeholder="Enter a title"
        numberOfLines={3}
        multiline
        allowClear={true}
      />

      <DropdownField
        name="event_category"
        control={control}
        label="Category"
        placeholder="Select a category"
        items={categoryOptions}
      />

      <Row>
        <View style={{ flex: 1 }}>
          <DatePickerField
            name="event_start_at"
            control={control}
            type="time"
            label="Start at"
            format={FORMAT_TYPES.TIME}
            placeholder="Select time"
          />
        </View>

        <Space width={16} />

        <View style={{ flex: 1 }}>
          <DatePickerField
            name="event_end_at"
            control={control}
            type="time"
            label="End at"
            format={FORMAT_TYPES.TIME}
            placeholder="Select time"
          />
        </View>
      </Row>

      <DatePickerField
        name="event_date"
        control={control}
        type="date"
        label="Date"
        format={FORMAT_TYPES.DD_MMMM_YYYY}
        placeholder="Select date"
      />

      <InputField
        name="event_location_name"
        label="Location Name"
        control={control}
        placeholder="Enter a location name"
        prefix={<LocationAdd size={15} color={COLORS.primary} />}
        allowClear
      />

      <LocationPickerField
        label="Location"
        placeholder="Select an address"
        name="event_location"
        control={control}
      />

      <SelectField
        name="event_invite_users"
        control={control}
        label="Invite users"
        placeholder="Select users"
        items={inviteUserOptions}
        multiple
      />

      <InputField
        name="event_price"
        label="Price"
        control={control}
        placeholder="Enter a price"
        keyboardType="number-pad"
        maxLength={10}
        allowClear
      />

      <AppButton
        text={initialValues?._id ? 'Save' : 'Add'}
        loading={loading || isLoadingUpload}
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
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Section>
  )
}
