import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { eventApi } from '@/api'
import { QueryKeys } from '@/constants'
import { Event, ListParams, ListResponse, SuccessResponse } from '@/models'

type UseEventListOptions = Omit<
  UseQueryOptions<SuccessResponse<ListResponse<Event>>>,
  'queryKey' | 'queryFn'
>
interface UseEventListProps {
  params?: Partial<ListParams>
  options?: UseEventListOptions
}

export const useEventList = ({ params = { page: 1, limit: 10 }, options }: UseEventListProps) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.EVENT_LIST, params],
    queryFn: () => eventApi.getAll(params)
  })
}
