import { ArrowRight, Lock, Sms, User } from 'iconsax-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import {
  AppButton,
  AppText,
  Container,
  InputField,
  Row,
  Section,
  SocialButtonGroup
} from '@/components'
import { COLORS, FONT_FAMILIES, SCREENS } from '@/constants'
import { SignUpScreenProps } from '@/models'

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const { control } = useForm()

  return (
    <Container isImageBackground isScroll back>
      <Section>
        <AppText
          text="Sign up"
          size={24}
          font={FONT_FAMILIES.medium}
          styles={{ marginBottom: 20 }}
        />

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
          text="Sign up"
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

      <SocialButtonGroup />

      <Section>
        <Row>
          <AppText text="Already have an account? " styles={{ marginLeft: 8 }} flex={0} size={15} />
          <AppButton
            text="Sign in"
            type="link"
            textStyles={{ fontSize: 15 }}
            onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}
          />
        </Row>
      </Section>
    </Container>
  )
}
