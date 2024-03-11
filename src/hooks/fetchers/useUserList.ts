import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { userApi } from '@/api'
import { QueryKeys } from '@/constants'
import { SuccessResponse, User } from '@/models'

type UseTnxDetailsOptions = Omit<
  UseQueryOptions<SuccessResponse<{ items: User[] }>>,
  'queryKey' | 'queryFn'
>

export const useUserList = (options?: UseTnxDetailsOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.USER_LIST],
    queryFn: () => userApi.getAll()
  })
}
