import React from 'react'
import { Toast } from 'toastify-react-native'
import { useMutation } from '@tanstack/react-query'

import { AddEditEventForm, Container } from '@/components'
import { Event, EventPayload } from '@/models'
import { eventApi } from '@/api'
import { SCREENS } from '@/constants'
import { useEventDetails } from '@/hooks'

export const AddEditEventScreen = ({ navigation, route }: any) => {
  const eventId = route.params?.eventId
  const isAddMode = !eventId

  const { data: eventDetailsData, refetch } = useEventDetails(eventId)

  const addEventMutation = useMutation({
    mutationFn: (body: Partial<Event>) => eventApi.add(body)
  })

  const updateEventMutation = useMutation({
    mutationFn: (body: Partial<Event>) => eventApi.update(body)
  })

  const handleAddEditEvent = (payload: Partial<EventPayload>) => {
    if (isAddMode) {
      addEventMutation.mutate(payload, {
        onSuccess: (data) => {
          navigation.navigate('Events', {
            screen: SCREENS.EVENT_DETAILS_SCREEN,
            params: {
              eventId: data.metadata._id
            }
          })
        },
        onError: (error) => {
          Toast.error(error.message, 'top')
        }
      })
    } else {
      updateEventMutation.mutate(payload, {
        onSuccess: (data) => {
          navigation.navigate('Events', {
            screen: SCREENS.EVENT_DETAILS_SCREEN,
            params: {
              eventId: data.metadata._id
            }
          })
          refetch()
        },
        onError: (error) => {
          Toast.error(error.message, 'top')
        }
      })
    }
  }

  return (
    <Container isScroll isImageBackground>
      {(isAddMode || Boolean(eventDetailsData?.metadata)) && (
        <AddEditEventForm
          initialValues={eventDetailsData?.metadata}
          key={route.params?.eventId}
          loading={addEventMutation.isPending || updateEventMutation.isPending}
          isAddSuccess={addEventMutation.isSuccess}
          onSubmit={handleAddEditEvent}
        />
      )}
    </Container>
  )
}
