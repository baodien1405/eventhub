import axios, { AxiosError } from 'axios'

import {
  getAccessTokenFromAS,
  setAccessTokenToAS,
  setProfileToAS,
  setRefreshTokenToAS
} from '@/utils'
import { AuthResponse } from '@/models'
import { API_ENDPOINTS, APP } from '@/constants'

const axiosClient = axios.create({
  baseURL: APP.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessTokenFromAS()

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    const { url } = response.config
    if (
      [
        API_ENDPOINTS.URL_LOGIN,
        API_ENDPOINTS.URL_SIGN_UP,
        API_ENDPOINTS.URL_SIGN_IN_FACEBOOK,
        API_ENDPOINTS.URL_SIGN_IN_GOOGLE
      ].includes(url as string)
    ) {
      const data = response.data as AuthResponse

      setAccessTokenToAS(data.metadata.accessToken)
      setRefreshTokenToAS(data.metadata.refreshToken)
      setProfileToAS(data.metadata.user)
    }

    return response.data
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response?.data)
  }
)

export default axiosClient
