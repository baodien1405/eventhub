import { COLORS, FONT_FAMILIES } from '@/constants'
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    paddingHorizontal: 30,
    paddingBottom: 20
  },
  text: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.text
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    maxHeight: 58
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.gray3
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6
  },
  iconContainer: {
    height: 30,
    width: 30,
    backgroundColor: '#3D56F0',
    borderRadius: 100
  }
})
