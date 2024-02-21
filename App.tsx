import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

import { SplashScreen } from '@/screens/splash'
import { AuthNavigator, MainNavigator } from '@/navigation'

const App = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [accessToken, setAccessToken] = useState('')

  const { getItem } = useAsyncStorage('accessToken')

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getItem()
      if (token) setAccessToken(token)
    }

    checkLogin()
  }, [getItem])

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {showSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </>
  )
}

export default App
