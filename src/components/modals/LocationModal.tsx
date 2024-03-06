import React from 'react'
import { Modal, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { SearchNormal1 } from 'iconsax-react-native'

import { AppButton, InputField, Row } from '@/components'
import { COLORS } from '@/constants'

interface LocationModalProps {
  visible: boolean
  onClose?: () => void
  onSelect?: () => void
}

export const LocationModal = ({ visible, onClose }: LocationModalProps) => {
  const { control } = useForm()

  return (
    <Modal visible={visible} style={{ flex: 1 }} animationType="fade">
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 52
        }}
      >
        <Row>
          <View style={{ flex: 1, marginRight: 12 }}>
            <InputField
              name="search"
              control={control}
              placeholder="Search"
              prefix={<SearchNormal1 variant="TwoTone" size={24} color={COLORS.gray} />}
              allowClear
              inputWrapperStyle={{ marginBottom: 0 }}
            />
          </View>
          <AppButton text="Cancel" type="link" onPress={onClose} />
        </Row>
      </View>
    </Modal>
  )
}
