import React from 'react'
import { Text } from 'react-native'

import { AppButton, Container, InputField, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { useForm } from 'react-hook-form'
import { Lock, Sms } from 'iconsax-react-native'

export const LoginScreen = () => {
  const { control } = useForm()
  return (
    <Container isImageBackground>
      <Text>LoginScreen</Text>

      <Space height={50} />

      <InputField
        name="email"
        control={control}
        label="Email"
        placeholder="abc@email.com"
        prefix={<Sms size={22} color={COLORS.gray} />}
        allowClear
      />

      <InputField
        name="password"
        control={control}
        label="Password"
        placeholder="Your password"
        prefix={<Lock size={22} color={COLORS.gray} />}
        isPassword
      />

      <AppButton
        text="Login"
        textColor={COLORS.white}
        textStyles={{
          fontSize: 16,
          fontFamily: FONT_FAMILIES.medium,
          fontWeight: '400',
          flex: 0,
          textTransform: 'uppercase'
        }}
      />
    </Container>
  )
}
