import React from 'react'
import { Toast } from 'toastify-react-native'
import { useMutation } from '@tanstack/react-query'

import { Container, ForgotPasswordForm } from '@/components'
import { ForgotPasswordPayload, ForgotPasswordScreenProps } from '@/models'
import { authApi } from '@/api'
import { SCREENS } from '@/constants'

export const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email)
  })

  const handleForgotPassword = async (payload: ForgotPasswordPayload) => {
    forgotPasswordMutation.mutate(payload.email, {
      onSuccess: () => {
        Toast.success('A new password sent to your email!')
        navigation.navigate(SCREENS.LOGIN_SCREEN)
      },
      onError: (error) => {
        Toast.error(error.message, 'top')
      }
    })
  }

  return (
    <Container isImageBackground back>
      <ForgotPasswordForm
        loading={forgotPasswordMutation.isPending}
        onSubmit={handleForgotPassword}
      />
    </Container>
  )
}
