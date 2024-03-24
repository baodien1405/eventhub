import * as yup from 'yup'

import { EventPayload } from '@/models'

interface UseEventSchemaProps {
  initialValues?: Partial<EventPayload>
}

export const useEventSchema = ({ initialValues }: UseEventSchemaProps) => {
  const schema = yup.object().shape({
    event_title: yup
      .string()
      .required('Please enter a title')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    event_description: yup
      .string()
      .required('Please enter a description')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    event_start_at: yup.date().required('Please select a time'),
    event_end_at: yup.date().required('Please select a time'),
    event_date: yup.date().required('Please select a date'),
    event_invite_users: yup
      .array()
      .of(yup.string().required())
      .min(1, 'Please select at least one')
      .required('Please select an user'),
    event_category: yup.string().required('Please select a category'),
    event_price: yup
      .string()
      .required('Please enter a price')
      .test((value, context) => {
        const MAX_PRICE = 1000
        if (Number(value) < MAX_PRICE) return true

        return context.createError({ message: `Please enter a price less than ${MAX_PRICE}.` })
      }),
    event_thumbnail: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        if (initialValues?._id || value?.file) return true

        return context.createError({ message: 'Please select an image.' })
      })
      .test('test-size', 'Maximum file exceeded. Please select another file.', (value: any) => {
        const fileSize = value?.file?.size || 0
        const MB_TO_BYTES = 1024 * 1024
        const MAX_SIZE = 3 * MB_TO_BYTES // 3MB

        return fileSize <= MAX_SIZE
      }),
    event_location_name: yup
      .string()
      .required('Please enter a location name')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    event_location: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        if (value?.event_address) return true

        return context.createError({ message: 'Please select a address.' })
      })
  })

  return schema
}
