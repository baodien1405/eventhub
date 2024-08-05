import React from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

import { AppText, EventCard } from '@/components'
import { Event } from '@/models'
import { COLORS } from '@/constants'

interface EventListProps {
  loading?: boolean
  eventList?: Event[]
}

export const EventList = ({ loading = false, eventList = [] }: EventListProps) => {
  if (loading) {
    return <ActivityIndicator color={COLORS.gray} size={32} />
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={eventList}
      renderItem={({ item }) => <EventCard key={item._id} event={item} />}
      ListEmptyComponent={<AppText text="Data Not Found" size={16} />}
    />
  )
}
