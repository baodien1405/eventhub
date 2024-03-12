import { Image as TImage } from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import { Toast } from 'toastify-react-native'

import { getErrorMessage } from '@/utils'

export const uploadImageToStorageFirebase = async (file?: TImage | null) => {
  try {
    if (file) {
      const filename = `${file.filename}.${file.path.split('.')[1]}`

      const path = `images/${filename}`

      await storage().ref(path).putFile(file.path)

      return await storage().ref(path).getDownloadURL()
    }
  } catch (error) {
    const message = getErrorMessage(error)
    Toast.error(message, 'top')
  }
}
