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
      .trim('Please enter a suffix with no leading or trailing spaces')
  })

  return schema
}
