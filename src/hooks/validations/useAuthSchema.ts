import * as yup from 'yup'

export const useAuthSchema = () => {
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter a name')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    email: yup
      .string()
      .required('Please enter an email')
      .email('Please enter a valid email')
      .matches(emailRegex, { message: 'Please enter a valid email' })
      .trim('Please enter a suffix with no leading or trailing spaces'),
    password: yup
      .string()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .min(6, 'Password is required to have at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Please enter a password')
      .oneOf([yup.ref('password')], 'The password does not match.')
  })

  return schema
}
