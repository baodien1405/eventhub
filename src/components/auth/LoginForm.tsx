import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ArrowRight, Lock, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Switch } from 'react-native'

import { AppButton, AppText, InputField, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { useAuthSchema } from '@/hooks'
import { LoginPayload, AuthStackNavigatorParamList } from '@/models'
import { globalStyles } from '@/styles'

interface LoginFormProps {
  initialValues?: LoginPayload
  loading?: boolean
  onSubmit?: (payload: LoginPayload) => void
}

export function LoginForm({ initialValues, loading, onSubmit }: LoginFormProps) {
  const schema = useAuthSchema()
  const navigation = useNavigation<NavigationProp<AuthStackNavigatorParamList>>()
  const [isRememberMe, setIsRememberMe] = useState(false)

  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema.pick(['email', 'password']))
  })

  const handleFormSubmit = (formValues: LoginPayload) => {
    onSubmit?.(formValues)
  }

  return (
    <Section>
      <AppText text="Sign in" size={24} font={FONT_FAMILIES.medium} styles={{ marginBottom: 20 }} />

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

      <Row justify="space-between" styles={{ marginBottom: 36 }}>
        <Row onPress={() => setIsRememberMe((prevState) => !prevState)}>
          <Switch
            trackColor={{ true: COLORS.primary }}
            thumbColor={COLORS.white}
            value={isRememberMe}
            onChange={() => setIsRememberMe((prevState) => !prevState)}
          />
          <AppText text="Remember me" styles={{ marginLeft: 8 }} flex={0} />
        </Row>

        <AppButton
          text="Forgot Password?"
          type="text"
          onPress={() => navigation.navigate(SCREENS.FORGOT_PASSWORD_SCREEN)}
        />
      </Row>

      <AppButton
        text="Sign in"
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
