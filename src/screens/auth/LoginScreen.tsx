import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { Toast } from 'toastify-react-native'

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
import { LoginPayload, LoginScreenProps } from '@/models'
import { authApi } from '@/api'
import { useAuthStore } from '@/store'

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { setIsAuthenticated } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (body: LoginPayload) => authApi.login(body)
  })

  const handleLogin = (payload: LoginPayload) => {
    loginMutation.mutate(payload, {
      onSuccess: () => {
        setIsAuthenticated(true)
      },
      onError: (error) => {
        Toast.error(error.message, 'top')
      }
    })
  }

  return (
    <Container isImageBackground isScroll>
      <View style={styles.wrapperLogo}>
        <Image source={IMAGES.textLogo} style={styles.logo} />
      </View>

      <LoginForm loading={loginMutation.isPending} onSubmit={handleLogin} />

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
