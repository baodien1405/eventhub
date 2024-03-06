import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowRight } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AppButton, AppText, InputField, LocationPickerField, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { useAddEditEventSchema } from '@/hooks'
import { Event } from '@/models'
import { globalStyles } from '@/styles'

interface AddEditEventFormProps {
  initialValues?: Event
  loading?: boolean
  onSubmit?: (payload: Event) => void
}

export function AddEditEventForm({ initialValues, loading, onSubmit }: AddEditEventFormProps) {
  const schema = useAddEditEventSchema()

  const { control, handleSubmit } = useForm<Event>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = (formValues: Event) => {
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

      <LocationPickerField label="Location" />

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
