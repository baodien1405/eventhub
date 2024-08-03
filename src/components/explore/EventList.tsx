import React from 'react'
import { FlatList } from 'react-native'

import { EventCard } from '@/components'
import { Event } from '@/models'

interface EventListProps {
  eventList?: Event[]
}

export const EventList = ({ eventList = [] }: EventListProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={eventList}
      renderItem={({ item }) => <EventCard key={item._id} event={item} />}
    />
  )
}
