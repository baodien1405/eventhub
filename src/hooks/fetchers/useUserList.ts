import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { userApi } from '@/api'
import { QueryKeys } from '@/constants'
import { SuccessResponse, User } from '@/models'

type UseUserListOptions = Omit<
  UseQueryOptions<SuccessResponse<{ items: User[] }>>,
  'queryKey' | 'queryFn'
>

export const useUserList = (options?: UseUserListOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.USER_LIST],
    queryFn: () => userApi.getAll()
  })
}
