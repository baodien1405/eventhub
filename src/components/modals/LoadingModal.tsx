import { View, Modal, ActivityIndicator } from 'react-native'
import React from 'react'

import { AppText } from '@/components'
import { COLORS } from '@/constants'

interface LoadingModalProps {
  visible: boolean
  mess?: string
}

export const LoadingModal = ({ visible }: LoadingModalProps) => {
  return (
    <Modal visible={visible} style={{ flex: 1 }} transparent statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator color={COLORS.white} size={32} />
        <AppText text="Loading" flex={0} color={COLORS.white} />
      </View>
    </Modal>
  )
}
