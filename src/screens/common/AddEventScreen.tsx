import React from 'react'

import { AddEditEventForm, Container } from '@/components'
import { EventPayload } from '@/models'

export const AddEventScreen = () => {
  const handleAddEditEvent = (payload: Partial<EventPayload>) => {
    console.log('🚀 ~ handleAddEditEvent ~ payload:', payload)
  }

  return (
    <Container isScroll isImageBackground>
      <AddEditEventForm onSubmit={handleAddEditEvent} />
    </Container>
  )
}
