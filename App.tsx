import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastManager from 'toastify-react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'

import { AppRouters } from '@/routers'

const queryClient = new QueryClient()

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      <Host>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AppRouters />
          </QueryClientProvider>

          <ToastManager textStyle={{ fontSize: 16 }} />
        </NavigationContainer>
      </Host>
    </GestureHandlerRootView>
  )
}

export default App
