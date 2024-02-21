import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { SplashScreen } from '@/screens/splash'
import { AuthNavigator } from '@/navigation'

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1500)

    return () => clearTimeout(timeout)
  }, [])

  return showSplash ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default App
