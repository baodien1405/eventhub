export interface Location {
  access: Position[]
  address: {
    city: string
    countryCode: string
    countryName: string
    county: string
    district: string
    houseNumber: string
    label: string
    postalCode: string
    state: string
    stateCode: string
    street: string
  }
  distance: number
  houseNumberType: string
  id: string
  mapView: {
    east: number
    north: number
    south: number
    west: number
  }
  position: Position
  resultType: string
  title: string
}

export interface Position {
  lat: number
  lng: number
}

export interface LocationPayload {
  search: string
}
