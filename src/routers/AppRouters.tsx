import React, { useEffect, useState } from 'react'

import { SplashScreen } from '@/screens/splash'
import { AuthNavigator, MainNavigator } from '@/navigation'
import { useAuthStore } from '@/store'
import { getAccessTokenFromAS, getProfileFromAS } from '@/utils'

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const AppRouters = () => {
  const [showSplash, setShowSplash] = useState(true)
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuthStore()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setShowSplash(true)
        const accessToken = await getAccessTokenFromAS()
        const profile = await getProfileFromAS()
        await delay(1000)
        setShowSplash(false)

        if (!accessToken) return
        setIsAuthenticated(Boolean(accessToken))
        setProfile(profile)
      } catch (error) {
        setShowSplash(false)
      }
    }

    checkAuthentication()
  }, [setIsAuthenticated, setProfile])

  if (showSplash) {
    return <SplashScreen />
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />
}
