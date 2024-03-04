import { APP, COLORS, FONT_FAMILIES } from '@/constants'
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor
    // paddingTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    paddingHorizontal: 28,
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
      height: 6
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8
  },
  iconContainer: {
    height: 30,
    width: 30,
    backgroundColor: '#3D56F0',
    borderRadius: 100
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    padding: 16,
    borderRadius: 10,
    width: APP.sizes.WIDTH - 32,
    backgroundColor: COLORS.white
  },
  tag: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 75
  }
})
