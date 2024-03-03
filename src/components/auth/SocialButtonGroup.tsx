import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Toast } from 'toastify-react-native'
import { useMutation } from '@tanstack/react-query'
import { LoginManager, Profile, Settings } from 'react-native-fbsdk-next'

import { AppButton, AppText, Section, Space } from '@/components'
import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { FacebookSVG, GoogleSVG } from '@/assets/svg'
import { FacebookLoginPayload, GoogleLoginPayload } from '@/models'
import { authApi } from '@/api'
import { useAuthStore } from '@/store'
import { getErrorMessage } from '@/utils'

GoogleSignin.configure({
  webClientId: APP.WEB_CLIENT_ID,
  iosClientId: APP.IOS_CLIENT_ID
})

Settings.setAppID(APP.FACEBOOK_APP_ID)

export const SocialButtonGroup = () => {
  const { setIsAuthenticated, setProfile } = useAuthStore()

  const signInWithGoogleMutation = useMutation({
    mutationFn: (payload: GoogleLoginPayload) => authApi.signInWithGoogle(payload)
  })

  const signInWithFacebookMutation = useMutation({
    mutationFn: (payload: FacebookLoginPayload) => authApi.signInWithFacebook(payload)
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
          setProfile(data.metadata.user)
        },
        onError: (error) => {
          Toast.error(error.message, 'top')
        }
      })
    } catch (error: any) {
      Toast.error(error.message, 'top')
    }
  }

  const handleLoginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile'])

      if (result.isCancelled) {
        Toast.error('Login cancelled!', 'top')
        return
      }

      const profile = await Profile.getCurrentProfile()

      if (profile) {
        const payload = {
          email: profile.email || profile.userID || '',
          fullName: profile.name || '',
          avatar: profile.imageURL || ''
        }

        signInWithFacebookMutation.mutate(payload, {
          onSuccess: (data) => {
            setIsAuthenticated(true)
            setProfile(data.metadata.user)
          },
          onError: (error) => {
            Toast.error(error.message, 'top')
          }
        })
      }
    } catch (error) {
      const message = getErrorMessage(error)
      Toast.error(message, 'top')
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
        loading={signInWithGoogleMutation.isPending}
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
        loading={signInWithFacebookMutation.isPending}
        onPress={handleLoginFacebook}
      />
    </Section>
  )
}
