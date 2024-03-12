import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowRight } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import * as yup from 'yup'

import {
  AppButton,
  AppText,
  DatePickerField,
  InputField,
  LocationPickerField,
  PhotoField,
  Row,
  Section,
  SelectField,
  Space
} from '@/components'
import { COLORS, FONT_FAMILIES, FORMAT_TYPES } from '@/constants'
import { useAddEditEventSchema, useUserList } from '@/hooks'
import { Event, Option } from '@/models'
import { globalStyles } from '@/styles'

interface AddEditEventFormProps {
  initialValues?: Partial<Event>
  loading?: boolean
  onSubmit?: (payload: Partial<Event>) => void
}

export function AddEditEventForm({ initialValues, loading, onSubmit }: AddEditEventFormProps) {
  const schema = useAddEditEventSchema()

  const { control, handleSubmit } = useForm<Partial<Event>>({
    defaultValues: {
      ...initialValues,
      title: '',
      description: '',
      thumbnail: null
    },
    resolver: yupResolver<yup.AnyObject>(schema)
  })

  const { data } = useUserList()

  const inviteUserOptions: Option[] =
    data?.metadata.items.map((user) => ({
      label: user.fullName,
      value: user._id || ''
    })) || []

  const handleFormSubmit = (formValues: Partial<Event>) => {
    onSubmit?.(formValues)
  }

  return (
    <Section>
      <AppText
        text="Add new event"
        size={24}
        font={FONT_FAMILIES.medium}
        styles={{ marginBottom: 20, textAlign: 'center' }}
      />

      <PhotoField name="thumbnail" label="Thumbnail" control={control} />

      <InputField
        name="title"
        label="Title"
        control={control}
        placeholder="Enter a title"
        allowClear
      />

      <InputField
        name="description"
        label="Description"
        control={control}
        placeholder="Enter a title"
        numberOfLines={3}
        multiline
        allowClear={true}
      />

      <Row>
        <View style={{ flex: 1 }}>
          <DatePickerField
            name="startAt"
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
            name="endAt"
            control={control}
            type="time"
            label="End at"
            format={FORMAT_TYPES.TIME}
            placeholder="Select time"
          />
        </View>
      </Row>

      <DatePickerField
        name="date"
        control={control}
        type="date"
        label="Date"
        format={FORMAT_TYPES.DD_MMMM_YYYY}
        placeholder="Select date"
      />

      <LocationPickerField label="Location" />

      <SelectField
        name="inviteUsers"
        control={control}
        label="Invite users"
        items={inviteUserOptions}
        multiple
      />

      <AppButton
        text="Submit"
        loading={loading}
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
