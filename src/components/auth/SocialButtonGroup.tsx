import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Toast } from 'toastify-react-native'
import { useMutation } from '@tanstack/react-query'

import { AppButton, AppText, Section, Space } from '@/components'
import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { FacebookSVG, GoogleSVG } from '@/assets/svg'
import { GoogleLoginPayload } from '@/models'
import { authApi } from '@/api'
import { useAuthStore } from '@/store'
import { setAccessTokenToAS } from '@/utils'

GoogleSignin.configure({
  webClientId: APP.WEB_CLIENT_ID,
  iosClientId: APP.IOS_CLIENT_ID
})

export const SocialButtonGroup = () => {
  const { setIsAuthenticated } = useAuthStore()

  const signInWithGoogleMutation = useMutation({
    mutationFn: (payload: GoogleLoginPayload) => authApi.signInWithGoogle(payload)
  })

  const handleLoginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const payload = {
        email: userInfo.user.email,
        fullName: userInfo.user.name || '',
        avatar: userInfo.user.photo || ''
      }

      signInWithGoogleMutation.mutate(payload, {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setAccessTokenToAS(data.metadata.accessToken)
        },
        onError: (error) => {
          Toast.error(error.message, 'top')
        }
      })
    } catch (error: any) {
      Toast.error(error.message, 'top')
    }
  }

  return (
    <Section styles={{ marginTop: 16 }}>
      <AppText
        styles={{ textAlign: 'center' }}
        text="OR"
        color={COLORS.gray4}
        size={16}
        font={FONT_FAMILIES.medium}
      />

      <Space height={12} />

      <AppButton
        text="Login with Google"
        color={COLORS.white}
        prefixIcon={<GoogleSVG />}
        styles={{ marginBottom: 17 }}
        textStyles={{
          fontSize: 16,
          fontFamily: FONT_FAMILIES.regular,
          flex: 0
        }}
        onPress={handleLoginGoogle}
      />

      <AppButton
        text="Login with Facebook"
        color={COLORS.white}
        prefixIcon={<FacebookSVG />}
        textStyles={{
          fontSize: 16,
          fontFamily: FONT_FAMILIES.regular,
          flex: 0
        }}
      />
    </Section>
  )
}
