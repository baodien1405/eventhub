import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'iconsax-react-native'
import { StyleSheet, TextInput } from 'react-native'

import { AppButton, AppText, Container, Row, Section, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { VerificationScreenProps } from '@/models'
import { convertSecondsTimeoutMinutes, convertToObscureEmail } from '@/utils'
import { useCountDown } from '@/hooks'

const TIMEOUT_VERIFICATION_CODE = 2 * 60 // 2 minutes

export const VerificationScreen = ({ route }: VerificationScreenProps) => {
  const email = route.params.email
  const { counter: timer } = useCountDown(TIMEOUT_VERIFICATION_CODE)
  const [codeValueList, setCodeValueList] = useState(['', '', '', ''])
  const currentCode = codeValueList.join('')

  const refCode0 = useRef<TextInput | null>(null)
  const refCode1 = useRef<TextInput | null>(null)
  const refCode2 = useRef<TextInput | null>(null)
  const refCode3 = useRef<TextInput | null>(null)

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
          disabled={currentCode.length !== 4}
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
            <Row styles={{ height: 30, width: 30, backgroundColor: '#3D56F0', borderRadius: 100 }}>
              <ArrowRight size={20} color={COLORS.white} />
            </Row>
          }
          onPress={() => {}}
        />

        <Row>
          <AppText text="Re-send code in" flex={0} />
          <Space width={4} />
          <AppText
            text={convertSecondsTimeoutMinutes(timer)}
            flex={0}
            styles={{ color: COLORS.link }}
          />
        </Row>
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
