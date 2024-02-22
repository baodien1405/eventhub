import React from 'react'

import { AppButton, AppText, Section, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { FacebookSVG, GoogleSVG } from '@/assets/svg'

export const SocialButtonGroup = () => {
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
