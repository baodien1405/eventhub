import React from 'react'
import { FlatList } from 'react-native'

import { EventCard } from '@/components'

export const UpcomingEventList = () => {
  const UPCOMING_EVENT_LIST = [
    {
      key: 1,
      title: 'International Band Mu...'
    },
    {
      key: 2,
      title: 'Jo Malone London’s Mo..'
    }
  ]

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={UPCOMING_EVENT_LIST}
      renderItem={({ item }) => <EventCard key={item.key} />}
    />
  )
}
