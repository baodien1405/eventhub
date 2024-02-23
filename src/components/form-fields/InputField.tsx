import React, { ReactNode, useState } from 'react'
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import Entypo from 'react-native-vector-icons/Entypo'

import { AppText, Row } from '@/components'
import { globalStyles } from '@/styles'
import { COLORS } from '@/constants'

type InputFieldProps<T extends FieldValues> = TextInputProps & {
  label?: string
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  allowClear?: boolean
  name: Path<T>
  control: Control<T>
  keyboardType?: KeyboardTypeOptions
  isPassword?: boolean
}

export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  prefix,
  suffix,
  allowClear,
  multiline,
  numberOfLines,
  keyboardType,
  isPassword = false,
  onChangeText: externalOnChangeText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlur: externalOnBlur,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <View style={styles.container}>
      {label && <AppText text={label} styles={styles.label} />}

      <Row
        styles={[
          globalStyles.inputContainer,
          {
            minHeight: multiline && numberOfLines ? 56 * numberOfLines : 56,
            paddingVertical: multiline && numberOfLines ? 4 : 14,
            alignItems: multiline && numberOfLines ? 'flex-start' : 'center',
            borderColor: error?.message ? COLORS.error : COLORS.gray3
          }
        ]}
      >
        {prefix && <View>{prefix}</View>}

        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 14 : 0,
            paddingRight: suffix ? 14 : 0
          }}
        >
          <TextInput
            value={value}
            style={[globalStyles.text, styles.input]}
            placeholder={placeholder}
            placeholderTextColor="#747688"
            multiline={multiline}
            numberOfLines={numberOfLines}
            ref={ref}
            keyboardType={keyboardType}
            secureTextEntry={isPassword ? !showPassword : false}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text)
              externalOnChangeText?.(text)
            }}
            {...rest}
          />
        </View>

        {suffix && <View>{suffix}</View>}

        {allowClear && value && (
          <TouchableOpacity
            onPress={() => {
              onChange('')
              externalOnChangeText?.('')
            }}
            style={{ marginTop: multiline && numberOfLines ? 10 : 0 }}
          >
            <AntDesign name="close" size={20} color={COLORS.white} />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={22} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </Row>

      {error?.message && (
        <AppText text={error.message} color={COLORS.error} flex={0} styles={styles.errorMessage} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    marginBottom: 8
  },
  input: {
    margin: 0,
    padding: 0
  },
  errorMessage: {
    marginTop: 8
  }
})
