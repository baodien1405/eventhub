import { Text } from 'react-native'
import React from 'react'

import { AppButton, Container, Row, Section } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { clearAS } from '@/utils'
import { useAuthStore } from '@/store'

export const HomeScreen = () => {
  const { setIsAuthenticated } = useAuthStore()

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearAS()
  }

  return (
    <Container>
      <Section>
        <Row>
          <Text>HomeScreen</Text>
        </Row>

        <AppButton
          text="Logout"
          textColor={COLORS.white}
          textStyles={{
            fontSize: 16,
            fontFamily: FONT_FAMILIES.medium,
            fontWeight: '400',
            textTransform: 'uppercase'
          }}
          onPress={handleLogout}
        />
      </Section>
    </Container>
  )
}
