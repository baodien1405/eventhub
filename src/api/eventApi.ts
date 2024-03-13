import { SuccessResponse, Event } from '@/models'
import { API_ENDPOINTS } from '@/constants'
import axiosClient from './axiosClient'

export const eventApi = {
  add(payload: Partial<Event>): Promise<SuccessResponse<any>> {
    return axiosClient.post(API_ENDPOINTS.URL_EVENT_LIST, payload)
  },
  update(payload: Partial<Event>): Promise<SuccessResponse<Event>> {
    return axiosClient.patch(`${API_ENDPOINTS.URL_EVENT_LIST}/${payload._id}`, payload)
  }
}
