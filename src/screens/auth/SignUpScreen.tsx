import React from 'react'

import {
  AppButton,
  AppText,
  Container,
  Row,
  Section,
  SignUpForm,
  SocialButtonGroup
} from '@/components'
import { SCREENS } from '@/constants'
import { SignUpPayload, SignUpScreenProps } from '@/models'
import { authApi } from '@/api'

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const handleSignUp = async (payload: SignUpPayload) => {
    try {
      const response = await authApi.sendVerificationCode(payload.email)

      if (response.metadata?.code) {
        navigation.navigate(SCREENS.VERIFICATION_SCREEN, {
          fullName: payload.fullName,
          email: payload.email,
          password: payload.password,
          verificationCode: String(response.metadata.code)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container isImageBackground isScroll back>
      <SignUpForm onSubmit={handleSignUp} />

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
