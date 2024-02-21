import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { SplashScreen } from '@/screens/splash'
import { AuthNavigator } from '@/navigation'
import { StatusBar } from 'react-native'

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {showSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
    </>
  )
}

export default App
