import axios from 'axios'

export const locationApi = {
  getLocation(lat: number, long: number) {
    const URL = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
    return axios.get(URL, {
      params: {
        at: `${lat},${long}`,
        lang: 'vi-VI',
        apiKey: process.env.API_KEY_LOCATION
      }
    })
  },
  getLocationList(params: { q: string; limit: number }) {
    const URL = 'https://autocomplete.search.hereapi.com/v1/autocomplete'
    return axios.get(URL, {
      params: {
        ...params,
        apiKey: process.env.API_KEY_LOCATION
      }
    })
  }
}
