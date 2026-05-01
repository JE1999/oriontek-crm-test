import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient, type UpdateClientPayload } from '@/services/clientsService'
import { CLIENTS_QUERY_KEY } from '@/hooks/useClients'

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateClientPayload) => updateClient(id, payload),
    onSuccess: (updated) => {
      // Update the individual client cache
      queryClient.setQueryData(['clients', id], updated)
      // Invalidate the full list so it refreshes too
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY })
    },
  })
}
