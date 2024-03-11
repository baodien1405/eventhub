import { SuccessResponse, User } from '@/models'
import { API_ENDPOINTS } from '@/constants'
import axiosClient from './axiosClient'

export const userApi = {
  getAll(): Promise<SuccessResponse<{ items: User[] }>> {
    return axiosClient.get(API_ENDPOINTS.URL_USER_LIST, {
      params: {}
    })
  }
}
