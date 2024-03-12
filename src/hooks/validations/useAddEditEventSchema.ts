import * as yup from 'yup'

export const useAddEditEventSchema = () => {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter a title')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    description: yup
      .string()
      .required('Please enter a description')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    startAt: yup.date().required('Please select a time'),
    endAt: yup.date().required('Please select a time'),
    date: yup.date().required('Please select a date'),
    inviteUsers: yup
      .array()
      .of(yup.string().required())
      .min(1, 'Please select at least one')
      .required('Please select an user'),
    thumbnail: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        if (value?.file) return true

        return context.createError({ message: 'Please select an image.' })
      })
      .test('test-size', 'Maximum file exceeded. Please select another file.', (value: any) => {
        const fileSize = value?.file?.size || 0
        const MB_TO_BYTES = 1024 * 1024
        const MAX_SIZE = 3 * MB_TO_BYTES // 3MB

        return fileSize <= MAX_SIZE
      })
  })

  return schema
}
