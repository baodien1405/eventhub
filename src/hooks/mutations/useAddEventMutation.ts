import { useMutation, useQueryClient } from '@tanstack/react-query'

import { eventApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useAddEventMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventApi.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.EVENT_LIST]
      })
    }
  })
}
