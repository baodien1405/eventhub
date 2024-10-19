import React from 'react'
import { Toast } from 'toastify-react-native'

import { Container, EventForm } from '@/components'
import { SCREENS } from '@/constants'
import { useAddEventMutation, useEventDetails, useUpdateEventMutation } from '@/hooks'
import { EventPayload } from '@/models'

export const AddEditEventScreen = ({ navigation, route }: any) => {
  const eventId = route.params?.eventId
  const isAddMode = !eventId

  const eventDetailsQuery = useEventDetails(eventId)
  const addEventMutation = useAddEventMutation()
  const updateEventMutation = useUpdateEventMutation()

  const handleAddEditEvent = (payload: Partial<EventPayload>) => {
    if (addEventMutation.isPending || updateEventMutation.isPending) return

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
          eventDetailsQuery.refetch()
        },
        onError: (error) => {
          Toast.error(error.message, 'top')
        }
      })
    }
  }

  return (
    <Container isScroll isImageBackground>
      {(isAddMode || Boolean(eventDetailsQuery.data?.metadata)) && (
        <EventForm
          initialValues={eventDetailsQuery.data?.metadata}
          key={route.params?.eventId}
          loading={addEventMutation.isPending || updateEventMutation.isPending}
          isAddSuccess={addEventMutation.isSuccess}
          onSubmit={handleAddEditEvent}
        />
      )}
    </Container>
  )
}
