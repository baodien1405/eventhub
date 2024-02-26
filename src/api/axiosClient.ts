import axios, { AxiosError } from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.6:8018/v1/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers
  }

  config.data
  return config
})

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response?.data)
  }
)

export default axiosClient
