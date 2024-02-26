export const convertToObscureEmail = (email: string) => {
  if (!email) return ''

  const [name, domain] = email.split('@')
  return `${name[0]}${new Array(name.length).join('*')}@${domain}`
}

export const convertSecondsTimeoutMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}
