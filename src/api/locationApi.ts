import axios from 'axios'

import { APP } from '@/constants'

export const locationApi = {
  getLocation(lat: number, long: number) {
    const URL = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
    return axios.get(URL, {
      params: {
        at: `${lat},${long}`,
        lang: 'vi-VI',
        apiKey: APP.API_KEY_LOCATION
      }
    })
  }
}
