import React, { useRef, useState } from 'react'
import { ArrowRight } from 'iconsax-react-native'
import { StyleSheet, TextInput } from 'react-native'

import { AppButton, AppText, Container, Row, Section, Space } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { VerificationScreenProps } from '@/models'
import { convertToObscureEmail } from '@/utils'

export const VerificationScreen = ({ route }: VerificationScreenProps) => {
  const email = route.params.email
  const [codeValueList, setCodeValueList] = useState(['', '', '', ''])
  const refCode1 = useRef<TextInput | null>(null)
  const refCode2 = useRef<TextInput | null>(null)
  const refCode3 = useRef<TextInput | null>(null)
  const refCode4 = useRef<TextInput | null>(null)

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
          <TextInput
            value={codeValueList[0]}
            style={styles.codeInput}
            placeholder="-"
            placeholderTextColor={COLORS.gray}
            keyboardType="number-pad"
            ref={refCode1}
            onChangeText={(value) => {
              handleTextChange(0, value)
            }}
          />
          <TextInput
            value={codeValueList[1]}
            style={styles.codeInput}
            placeholder="-"
            placeholderTextColor={COLORS.gray}
            keyboardType="number-pad"
            ref={refCode2}
            onChangeText={(value) => {
              handleTextChange(1, value)
            }}
          />
          <TextInput
            value={codeValueList[2]}
            style={styles.codeInput}
            placeholder="-"
            placeholderTextColor={COLORS.gray}
            keyboardType="number-pad"
            ref={refCode3}
            onChangeText={(value) => {
              handleTextChange(2, value)
            }}
          />
          <TextInput
            value={codeValueList[3]}
            style={styles.codeInput}
            placeholder="-"
            placeholderTextColor={COLORS.gray}
            keyboardType="number-pad"
            ref={refCode4}
            onChangeText={(value) => {
              handleTextChange(3, value)
            }}
          />
        </Row>

        <AppButton
          loading={false}
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
          <AppText text="0:20" flex={0} styles={{ color: COLORS.link }} />
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
