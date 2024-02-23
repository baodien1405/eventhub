import { ArrowRight, Sms } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AppButton, AppText, Container, InputField, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'

export const ForgotPasswordScreen = () => {
  const { control } = useForm()

  return (
    <Container isImageBackground back>
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
          text="Send"
          textColor={COLORS.white}
          textStyles={{
            fontSize: 16,
            fontFamily: FONT_FAMILIES.medium,
            fontWeight: '400',
            textTransform: 'uppercase'
          }}
          suffixIcon={
            <Row styles={{ height: 30, width: 30, backgroundColor: '#3D56F0', borderRadius: 100 }}>
              <ArrowRight size={20} color={COLORS.white} />
            </Row>
          }
        />
      </Section>
    </Container>
  )
}
