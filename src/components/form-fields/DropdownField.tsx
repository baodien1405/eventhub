import { ArrowDown2, SearchNormal1, TickCircle } from 'iconsax-react-native'
import React, { ReactNode, useState } from 'react'
import { Control, FieldValues, Path, useController, useForm } from 'react-hook-form'
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'

import { AppText, InputField, Row } from '@/components'
import { COLORS, FONT_FAMILIES } from '@/constants'
import { Option } from '@/models'
import { globalStyles } from '@/styles'

type DropdownFieldProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  name: Path<T>
  control: Control<T>

  items: Option[]
  multiple?: boolean
  onChange?: (value: string) => void
}

export function DropdownField<T extends FieldValues>({
  name,
  control,
  placeholder,
  label,
  items,
  onChange: externalOnChange
}: DropdownFieldProps<T>) {
  const [isVisible, setIsVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { control: searchControl } = useForm()

  const filteredItems = items.filter((x) =>
    x.label.toLowerCase().includes(searchText.toLowerCase())
  )

  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const selectedLabel = items.find((x) => x.value === value)?.label || ''

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    externalOnChange?.(selectedValue)

    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      {label && <AppText text={label} styles={styles.label} />}

      <Row
        styles={[
          globalStyles.inputContainer,
          styles.row,
          {
            borderWidth: 0.5,
            borderColor: error?.message ? COLORS.error : COLORS.gray2
          }
        ]}
        onPress={() => setIsVisible(true)}
      >
        {selectedLabel ? (
          <AppText text={selectedLabel} flex={0} />
        ) : (
          <AppText text={placeholder || ''} color={COLORS.gray2} />
        )}

        <ArrowDown2 size={20} color={COLORS.text} />
      </Row>

      {error?.message && (
        <AppText text={error.message} color={COLORS.error} flex={0} styles={styles.errorMessage} />
      )}

      <Modal
        visible={isVisible}
        style={styles.modal}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={[globalStyles.container, styles.modalContainer]}>
          <FlatList
            ListHeaderComponent={
              <Row>
                <View style={styles.searchContainer}>
                  <InputField
                    name="search"
                    placeholder="Search..."
                    prefix={<SearchNormal1 size={20} color={COLORS.gray2} />}
                    control={searchControl}
                    onChangeText={(text) => setSearchText(text)}
                    allowClear
                    inputWrapperStyle={{ marginBottom: 0 }}
                  />
                </View>

                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <AppText text="Cancel" color={COLORS.primary} flex={0} />
                </TouchableOpacity>
              </Row>
            }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            data={filteredItems}
            renderItem={({ item }) => {
              const isSelected = item.value === value

              return (
                <Row
                  key={item.value}
                  styles={{ paddingVertical: 16 }}
                  onPress={() => handleSelect(item.value)}
                >
                  <AppText
                    text={item.label}
                    size={16}
                    color={isSelected ? COLORS.primary : COLORS.text}
                  />
                  {isSelected && <TickCircle size={22} color={COLORS.primary} />}
                </Row>
              )
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: FONT_FAMILIES.medium,
    lineHeight: 34
  },
  row: {
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  input: {
    margin: 0,
    padding: 0,
    marginVertical: 6,
    flex: 1,
    textAlignVertical: 'top'
  },
  errorMessage: {
    marginTop: 8
  },
  modal: {
    flex: 1
  },
  modalContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 60
  },
  searchContainer: {
    flex: 1,
    marginRight: 12
  }
})
