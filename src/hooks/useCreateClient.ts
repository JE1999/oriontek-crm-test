import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/services/clientsService'
import { CLIENTS_QUERY_KEY } from '@/hooks/useClients'
import type { CreateClientPayload } from '@/store/types/client'

export function useCreateClient() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY })
    },
  })
}
