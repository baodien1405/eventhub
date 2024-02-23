import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { IMAGES } from '@/assets/images'
import {
  AppButton,
  AppText,
  Container,
  LoginForm,
  Row,
  Section,
  SocialButtonGroup
} from '@/components'
import { SCREENS } from '@/constants'
import { LoginScreenProps } from '@/models'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  return (
    <Container isImageBackground isScroll>
      <View style={styles.wrapperLogo}>
        <Image source={IMAGES.textLogo} style={styles.logo} />
      </View>

      <LoginForm />

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
