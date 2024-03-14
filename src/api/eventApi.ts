import { SuccessResponse, Event, ListParams, ListResponse } from '@/models'
import { API_ENDPOINTS } from '@/constants'
import axiosClient from './axiosClient'

export const eventApi = {
  getAll(params: Partial<ListParams>): Promise<SuccessResponse<ListResponse<Event>>> {
    return axiosClient.get(API_ENDPOINTS.URL_EVENT_LIST, { params })
  },

  get(id: string): Promise<SuccessResponse<Event>> {
    return axiosClient.get(`${API_ENDPOINTS.URL_EVENT_LIST}/${id}`)
  },

  add(payload: Partial<Event>): Promise<SuccessResponse<Event>> {
    return axiosClient.post(API_ENDPOINTS.URL_EVENT_LIST, payload)
  },

  update(payload: Partial<Event>): Promise<SuccessResponse<Event>> {
    return axiosClient.patch(`${API_ENDPOINTS.URL_EVENT_LIST}/${payload._id}`, payload)
  }
}
