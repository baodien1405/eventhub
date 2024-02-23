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
import { SignUpScreenProps } from '@/models'

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  return (
    <Container isImageBackground isScroll back>
      <SignUpForm />

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
