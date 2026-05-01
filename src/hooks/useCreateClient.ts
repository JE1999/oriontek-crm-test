import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/services/clientsService'
import { QUERY_KEYS } from '@/constants'
import type { CreateClientPayload } from '@/store/types/client'

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS })
    },
  })
}
