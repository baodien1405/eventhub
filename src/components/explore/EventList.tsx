import React from 'react'
import { FlatList } from 'react-native'

import { EventCard } from '@/components'
import { useEventList } from '@/hooks'

export const EventList = () => {
  const { data } = useEventList({
    params: {
      page: 1,
      limit: 30
    }
  })

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data?.metadata.results || []}
      renderItem={({ item }) => <EventCard key={item._id} event={item} />}
    />
  )
}
