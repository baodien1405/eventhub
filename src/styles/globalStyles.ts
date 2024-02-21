import { COLORS, FONT_FAMILIES } from '@/constants'
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingTop: 20
  },
  text: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.text
  }
})
