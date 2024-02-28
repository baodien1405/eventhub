import axios, { AxiosError } from 'axios'
import { URL_LOGIN, URL_SIGN_UP } from '@/api'
import { getAccessTokenFromAS, setAccessTokenToAS, setRefreshTokenToAS } from '@/utils'
import { AuthResponse } from '@/models'

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.6:8018/v1/api',
  // baseURL: 'http://192.168.10.84:8018/v1/api',
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
    if ([URL_LOGIN, URL_SIGN_UP].includes(url as string)) {
      const data = response.data as AuthResponse

      setAccessTokenToAS(data.metadata.accessToken)
      setRefreshTokenToAS(data.metadata.refreshToken)
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
