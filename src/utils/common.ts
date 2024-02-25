export const convertToObscureEmail = (email: string) => {
  if (!email) return ''

  const [name, domain] = email.split('@')
  return `${name[0]}${new Array(name.length).join('*')}@${domain}`
}
