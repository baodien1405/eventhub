import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventApi } from '@/api'
import { QueryKeys } from '@/constants'

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: eventApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.EVENT_LIST]
      })
    }
  })
}
