import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'iconsax-react-native'
import { StyleSheet, TextInput } from 'react-native'

import { AppButton, AppText, Container, LoadingModal, Row, Section, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { VerificationScreenProps } from '@/models'
import { convertSecondsTimeoutMinutes, convertToObscureEmail } from '@/utils'
import { useCountDown } from '@/hooks'
import { globalStyles } from '@/styles'
import { authApi } from '@/api'

const TIMEOUT_VERIFICATION_CODE = 2 * 60 // 2 minutes

export const VerificationScreen = ({ route }: VerificationScreenProps) => {
  const { email, verificationCode, fullName, password } = route.params
  const [isLoadingResendCode, setIsLoadingResendCode] = useState(false)
  const [currentCode, setCurrentCode] = useState(verificationCode)
  const [codeValueList, setCodeValueList] = useState(['', '', '', ''])
  const enteredCode = codeValueList.join('')

  const refCode0 = useRef<TextInput | null>(null)
  const refCode1 = useRef<TextInput | null>(null)
  const refCode2 = useRef<TextInput | null>(null)
  const refCode3 = useRef<TextInput | null>(null)

  const { counter: timer, reset: resetTimer } = useCountDown(TIMEOUT_VERIFICATION_CODE)

  useEffect(() => {
    refCode0.current?.focus()
  }, [])

  const getRefCode = (index: number) => {
    const refList = {
      0: refCode0,
      1: refCode1,
      2: refCode2,
      3: refCode3,
      default: refCode0
    }

    return (refList as any)[index] || refList.default
  }

  const handleTextChange = (index: number, value: string) => {
    const newCodeValueList = [...codeValueList]
    newCodeValueList[index] = value

    setCodeValueList(newCodeValueList)
  }

  const handleResendVerificationCode = async () => {
    try {
      setIsLoadingResendCode(true)
      const response = await authApi.sendVerificationCode(email)
      setIsLoadingResendCode(false)

      if (response.metadata?.code) {
        setCurrentCode(response.metadata?.code)
        resetTimer()
      }
    } catch (error) {
      setIsLoadingResendCode(false)
    }
  }

  const handleContinue = async () => {
    try {
      if (enteredCode === currentCode) {
        setIsLoadingResendCode(true)
        await authApi.register({
          email,
          fullName,
          password
        })
        setIsLoadingResendCode(false)
      }
    } catch (error) {
      setIsLoadingResendCode(false)
    }
  }

  return (
    <Container isImageBackground back>
      <Section>
        <AppText
          text="Verification"
          size={24}
          font={FONT_FAMILIES.medium}
          styles={{ marginBottom: 12 }}
          flex={0}
        />

        <AppText
          text={`We’ve send you the verification code on ${convertToObscureEmail(email)}`}
          size={15}
          styles={{ marginBottom: 26, maxWidth: 244 }}
          flex={0}
        />

        <Row justify="space-around">
          {codeValueList.map((code, index) => {
            return (
              <TextInput
                key={index}
                value={code}
                style={styles.codeInput}
                placeholder="-"
                placeholderTextColor={COLORS.gray}
                keyboardType="number-pad"
                ref={getRefCode(index)}
                maxLength={1}
                onChangeText={(value) => {
                  if (value && index < 3) {
                    getRefCode(index + 1).current?.focus()
                  }
                  handleTextChange(index, value)
                }}
              />
            )
          })}
        </Row>

        <AppButton
          loading={false}
          disabled={enteredCode.length !== 4 || timer === 0}
          text="Continue"
          textColor={COLORS.white}
          styles={{ marginTop: 40, marginBottom: 24 }}
          textStyles={{
            fontSize: 16,
            fontFamily: FONT_FAMILIES.medium,
            fontWeight: '400',
            textTransform: 'uppercase'
          }}
          suffixIcon={
            <Row styles={globalStyles.iconContainer}>
              <ArrowRight size={20} color={COLORS.white} />
            </Row>
          }
          onPress={handleContinue}
        />

        {timer > 0 ? (
          <Row>
            <AppText text="Re-send code in" flex={0} />
            <Space width={4} />
            <AppText
              text={convertSecondsTimeoutMinutes(timer)}
              flex={0}
              styles={{ color: COLORS.link }}
            />
          </Row>
        ) : (
          <Row>
            <AppButton
              text="Resend verification code"
              type="link"
              onPress={handleResendVerificationCode}
            />
          </Row>
        )}

        <LoadingModal visible={isLoadingResendCode} />
      </Section>
    </Container>
  )
}

const styles = StyleSheet.create({
  codeInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.gray3,
    fontSize: 24,
    fontFamily: FONT_FAMILIES.medium,
    paddingHorizontal: 20,
    paddingVertical: 12,
    textAlign: 'center'
  }
})
