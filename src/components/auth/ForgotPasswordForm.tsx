import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowRight, Sms } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AppButton, AppText, InputField, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { useAuthSchema } from '@/hooks'
import { ForgotPasswordPayload } from '@/models'
import { globalStyles } from '@/styles'

interface ForgotPasswordFormProps {
  loading?: boolean
  initialValues?: ForgotPasswordPayload
  onSubmit?: (payload: ForgotPasswordPayload) => void
}

export function ForgotPasswordForm({ loading, initialValues, onSubmit }: ForgotPasswordFormProps) {
  const schema = useAuthSchema()

  const { control, handleSubmit } = useForm<ForgotPasswordPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema.pick(['email']))
  })

  const handleFormSubmit = async (formValues: ForgotPasswordPayload) => {
    await onSubmit?.(formValues)
  }

  return (
    <Section>
      <AppText
        text="Reset Password"
        size={24}
        font={FONT_FAMILIES.medium}
        styles={{ marginBottom: 12 }}
        flex={0}
      />

      <AppText
        text="Please enter your email address to request a password reset"
        size={15}
        styles={{ marginBottom: 26, maxWidth: 244 }}
        flex={0}
      />

      <InputField
        name="email"
        control={control}
        placeholder="abc@email.com"
        prefix={<Sms size={22} color={COLORS.gray} />}
        allowClear
      />

      <AppButton
        loading={loading}
        text="Send"
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
