import React from 'react'
import { Toast } from 'toastify-react-native'
import { useMutation } from '@tanstack/react-query'

import { AddEditEventForm, Container } from '@/components'
import { Event, EventPayload } from '@/models'
import { eventApi } from '@/api'
import { SCREENS } from '@/constants'

export const AddEditEventScreen = ({ navigation, route }: any) => {
  const isAddMode = !route.params?.eventId

  const addEventMutation = useMutation({
    mutationFn: (body: Partial<Event>) => eventApi.add(body)
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
    }
  }

  return (
    <Container isScroll isImageBackground>
      {isAddMode && (
        <AddEditEventForm
          key={route.params?.eventId}
          loading={addEventMutation.isPending}
          onSubmit={handleAddEditEvent}
        />
      )}
    </Container>
  )
}
