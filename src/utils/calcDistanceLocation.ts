const toRoad = (value: number) => (value * Math.PI) / 100

export const calcDistanceLocation = ({
  currentLat,
  currentLng,
  addressLat,
  addressLng
}: {
  currentLat: number
  currentLng: number
  addressLat: number
  addressLng: number
}) => {
  const r = 6371
  const dLat = toRoad(addressLat - currentLat)
  const dLng = toRoad(addressLng - currentLng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(toRoad(currentLat)) *
      Math.cos(toRoad(addressLat))

  return r * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
}
