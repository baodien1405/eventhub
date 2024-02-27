import React from 'react'
import { Toast } from 'toastify-react-native'

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
import { useMutation } from '@tanstack/react-query'

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const sendVerificationCodeMutation = useMutation({
    mutationFn: (email: string) => authApi.sendVerificationCode(email)
  })

  const handleSignUp = async (payload: SignUpPayload) => {
    sendVerificationCodeMutation.mutate(payload.email, {
      onSuccess: (data) => {
        navigation.navigate(SCREENS.VERIFICATION_SCREEN, {
          fullName: payload.fullName,
          email: payload.email,
          password: payload.password,
          verificationCode: String(data.metadata.code)
        })
      },
      onError: (error) => {
        Toast.error(error.message, 'top')
      }
    })
  }

  return (
    <Container isImageBackground isScroll back>
      <SignUpForm loading={sendVerificationCodeMutation.isPending} onSubmit={handleSignUp} />

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
