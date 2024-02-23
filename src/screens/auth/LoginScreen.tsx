import { ArrowRight, Lock, Sms } from 'iconsax-react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, StyleSheet, Switch, View } from 'react-native'

import { IMAGES } from '@/assets/images'
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
import { LoginScreenProps } from '@/models'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { control } = useForm()
  const [isRememberMe, setIsRememberMe] = useState(false)

  return (
    <Container isImageBackground isScroll>
      <View style={styles.wrapperLogo}>
        <Image source={IMAGES.textLogo} style={styles.logo} />
      </View>

      <Section>
        <AppText
          text="Sign in"
          size={24}
          font={FONT_FAMILIES.medium}
          styles={{ marginBottom: 20 }}
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
          <AppText text="Don't have an account? " styles={{ marginLeft: 8 }} flex={0} size={15} />
          <AppButton
            text="Sign up"
            type="link"
            textStyles={{ fontSize: 15 }}
            onPress={() => navigation.navigate(SCREENS.SIGN_UP_SCREEN)}
          />
        </Row>
      </Section>
    </Container>
  )
}

const styles = StyleSheet.create({
  wrapperLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75
  },
  logo: {
    width: 162,
    height: 114,
    marginBottom: 30
  }
})
