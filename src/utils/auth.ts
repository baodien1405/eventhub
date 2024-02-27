import AsyncStorage from '@react-native-async-storage/async-storage'

export const setAccessTokenToAS = async (access_token: string) => {
  try {
    await AsyncStorage.setItem('access_token', access_token)
  } catch (error) {
    console.log('Error storing the access token ', error)
  }
}

export const setRefreshTokenToAS = async (refresh_token: string) => {
  try {
    await AsyncStorage.setItem('refresh_token', refresh_token)
  } catch (error) {
    console.log('Error storing the access token ', error)
  }
}

export const clearAS = async () => {
  try {
    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('refresh_token')
  } catch (error) {
    console.log('Error removing the auth token ', error)
  }
}

export const getAccessTokenFromAS = async () => {
  try {
    return (await AsyncStorage.getItem('access_token')) || ''
  } catch (error) {
    console.log('Error getting the access token ', error)
    return ''
  }
}

export const getRefreshTokenFromAS = async () => {
  try {
    return (await AsyncStorage.getItem('refresh_token')) || ''
  } catch (error) {
    console.log('Error getting the refresh token ', error)
    return ''
  }
}
