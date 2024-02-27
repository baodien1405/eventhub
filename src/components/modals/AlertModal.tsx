import React from 'react'
import { Modal, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { COLORS } from '@/constants'
import { globalStyles } from '@/styles'
import { AppButton, AppText, Row } from '@/components'

interface Props {
  isVisible: boolean
  onClose: () => void
  title?: string
  mess?: string
  onOK: () => void
}

export const AlertModal = (props: Props) => {
  const { isVisible, onClose, title, mess, onOK } = props

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[globalStyles.modalContainer]}>
        <View style={[globalStyles.modalContent]}>
          <Row justify="flex-end">
            <AppText text={title ?? ''} size={22} />
            <AppButton
              text=""
              onPress={onClose}
              prefixIcon={<AntDesign name="close" size={22} color={COLORS.gray} />}
            />
          </Row>
          <View style={{ paddingVertical: 20 }}>
            <AppText text={mess ?? ''} flex={0} size={16} />
          </View>
          <AppButton onPress={onOK} text="OK" styles={{ height: 32 }} />
        </View>
      </View>
    </Modal>
  )
}
