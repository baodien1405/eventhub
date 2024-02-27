import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowRight, Lock, Sms, User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AppButton, AppText, InputField, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { useAuthSchema } from '@/hooks'
import { SignUpPayload } from '@/models'
import { globalStyles } from '@/styles'

interface SignUpFormProps {
  loading?: boolean
  initialValues?: SignUpPayload
  onSubmit?: (payload: SignUpPayload) => void
}

export function SignUpForm({ loading, initialValues, onSubmit }: SignUpFormProps) {
  const schema = useAuthSchema()

  const { control, handleSubmit } = useForm<SignUpPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (formValues: SignUpPayload) => {
    await onSubmit?.(formValues)
  }

  return (
    <Section>
      <AppText text="Sign up" size={24} font={FONT_FAMILIES.medium} styles={{ marginBottom: 20 }} />

      <InputField
        name="fullName"
        control={control}
        placeholder="Full name"
        prefix={<User size={22} color={COLORS.gray} />}
        allowClear
      />

      <InputField
        name="email"
        control={control}
        placeholder="abc@email.com"
        prefix={<Sms size={22} color={COLORS.gray} />}
        allowClear
      />

      <InputField
        name="password"
        control={control}
        placeholder="Your password"
        prefix={<Lock size={22} color={COLORS.gray} />}
        isPassword
      />

      <InputField
        name="confirmPassword"
        control={control}
        placeholder="Confirm password"
        prefix={<Lock size={22} color={COLORS.gray} />}
        isPassword
      />

      <AppButton
        loading={loading}
        text="Sign up"
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
