import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastManager from 'toastify-react-native'

import { AppRouters } from '@/routers'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppRouters />
        </QueryClientProvider>

        <ToastManager textStyle={{ fontSize: 16 }} />
      </NavigationContainer>
    </>
  )
}

export default App
