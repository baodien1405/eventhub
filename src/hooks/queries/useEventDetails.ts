import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { eventApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Event, SuccessResponse } from '@/models'

type UseEventOptions = Omit<UseQueryOptions<SuccessResponse<Event>>, 'queryKey' | 'queryFn'>

export const useEventDetails = (eventId: string, options?: UseEventOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.EVENT_DETAILS, eventId],
    queryFn: () => eventApi.get(eventId),
    enabled: Boolean(eventId)
  })
}
